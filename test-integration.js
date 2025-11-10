/**
 * Script de Testing de Integración
 * Verifica que todos los endpoints estén funcionando correctamente
 */

const http = require('http');
const https = require('https');

const API_URL = 'http://localhost:4000/api/v1';

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

let testsPassed = 0;
let testsFailed = 0;

async function test(name, fn) {
  try {
    console.log(`\n${colors.blue}[TEST]${colors.reset} ${name}`);
    await fn();
    console.log(`${colors.green}✓ PASSED${colors.reset}`);
    testsPassed++;
  } catch (error) {
    console.log(`${colors.red}✗ FAILED${colors.reset}: ${error?.message || error?.toString() || 'Unknown error'}`);
    if (error?.stack) {
      console.log(`  Stack: ${error.stack.split('\n').slice(0, 3).join('\n  ')}`);
    }
    testsFailed++;
  }
}

async function request(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_URL}${path}`);
    const isHttps = url.protocol === 'https:';
    const lib = isHttps ? https : http;
    
    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const req = lib.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(body ? JSON.parse(body) : {});
          } catch (e) {
            resolve(body);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data && method !== 'GET') {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Variables globales para los tests
let authToken = null;
let testUserId = null;
let testProductId = null;

console.log(`${colors.yellow}
╔════════════════════════════════════════════════════════════╗
║         CROW-V2 INTEGRATION TEST SUITE                     ║
║         Testing Backend API Endpoints                      ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}`);

async function runTests() {
  // ============================================
  // 1. HEALTH CHECK
  // ============================================
  console.log(`\n${colors.yellow}=== HEALTH CHECK ===${colors.reset}`);
  
  await test('Backend is accessible', async () => {
    return new Promise((resolve, reject) => {
      http.get('http://localhost:4000', (res) => {
        if (res.statusCode === 200 || res.statusCode === 404) {
          resolve();
        } else {
          reject(new Error('Backend not responding'));
        }
      }).on('error', reject);
    });
  });

  // ============================================
  // 2. AUTHENTICATION TESTS
  // ============================================
  console.log(`\n${colors.yellow}=== AUTHENTICATION ===${colors.reset}`);
  
  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  
  await test('Register new user', async () => {
    const result = await request('POST', '/auth/register', {
      email: testEmail,
      password: testPassword,
      name: 'Test User',
    });
    
    if (!result.user || !result.user.id) {
      throw new Error('User registration failed');
    }
    testUserId = result.user.id;
  });
  
  await test('Login with credentials', async () => {
    const result = await request('POST', '/auth/login', {
      email: testEmail,
      password: testPassword,
    });
    
    if (!result.accessToken) {
      throw new Error('Login failed - no access token');
    }
    authToken = result.accessToken;
  });
  
  await test('Get current user profile', async () => {
    const result = await request('GET', '/users/me', null, authToken);
    
    if (!result.email || result.email !== testEmail) {
      throw new Error('Profile data mismatch');
    }
  });

  // ============================================
  // 3. PRODUCTS TESTS
  // ============================================
  console.log(`\n${colors.yellow}=== PRODUCTS ===${colors.reset}`);
  
  await test('Get all products', async () => {
    const result = await request('GET', '/products');
    
    if (!Array.isArray(result)) {
      throw new Error('Products should be an array');
    }
    
    if (result.length > 0) {
      testProductId = result[0].id;
      console.log(`  → Found ${result.length} products`);
    }
  });
  
  if (testProductId) {
    await test('Get product by ID', async () => {
      const result = await request('GET', `/products/${testProductId}`);
      
      if (!result.id || result.id !== testProductId) {
        throw new Error('Product ID mismatch');
      }
    });
    
    await test('Search products', async () => {
      const result = await request('GET', '/products?search=test');
      
      if (!Array.isArray(result)) {
        throw new Error('Search should return an array');
      }
    });
  }

  // ============================================
  // 4. CART TESTS
  // ============================================
  console.log(`\n${colors.yellow}=== CART ===${colors.reset}`);
  
  await test('Get empty cart', async () => {
    const result = await request('GET', '/cart', null, authToken);
    
    if (!result.items || !Array.isArray(result.items)) {
      throw new Error('Cart should have items array');
    }
  });
  
  if (testProductId) {
    await test('Add product to cart', async () => {
      const result = await request('POST', '/cart/items', {
        productId: testProductId,
        quantity: 2,
      }, authToken);
      
      if (!result.items || result.items.length === 0) {
        throw new Error('Cart should have items after adding');
      }
      console.log(`  → Added product ${testProductId} with quantity 2`);
    });
    
    await test('Update cart item quantity', async () => {
      const result = await request('PATCH', `/cart/items/${testProductId}`, {
        quantity: 3,
      }, authToken);
      
      const item = result.items.find(i => i.product.id === testProductId);
      if (!item || item.quantity !== 3) {
        throw new Error('Cart item quantity not updated');
      }
      console.log(`  → Updated quantity to 3`);
    });
    
    await test('Remove product from cart', async () => {
      await request('DELETE', `/cart/items/${testProductId}`, null, authToken);
      
      const result = await request('GET', '/cart', null, authToken);
      const item = result.items.find(i => i.product.id === testProductId);
      if (item) {
        throw new Error('Item should be removed from cart');
      }
    });
  }

  // ============================================
  // 5. WISHLIST TESTS
  // ============================================
  console.log(`\n${colors.yellow}=== WISHLIST ===${colors.reset}`);
  
  await test('Get empty wishlist', async () => {
    const result = await request('GET', '/wishlist', null, authToken);
    
    if (!result.items || !Array.isArray(result.items)) {
      throw new Error('Wishlist should have items array');
    }
  });
  
  if (testProductId) {
    await test('Add product to wishlist', async () => {
      const result = await request('POST', '/wishlist/items', {
        productId: testProductId,
      }, authToken);
      
      if (!result.items || result.items.length === 0) {
        throw new Error('Wishlist should have items after adding');
      }
      console.log(`  → Added product ${testProductId} to wishlist`);
    });
    
    await test('Remove product from wishlist', async () => {
      await request('DELETE', `/wishlist/items/${testProductId}`, null, authToken);
      
      const result = await request('GET', '/wishlist', null, authToken);
      const item = result.items.find(i => i.product.id === testProductId);
      if (item) {
        throw new Error('Item should be removed from wishlist');
      }
    });
  }

  // ============================================
  // 6. ORDERS TESTS
  // ============================================
  console.log(`\n${colors.yellow}=== ORDERS ===${colors.reset}`);
  
  let orderId = null;
  
  if (testProductId) {
    // Primero agregar producto al carrito
    await request('POST', '/cart/items', {
      productId: testProductId,
      quantity: 1,
    }, authToken);
    
    await test('Create order from cart', async () => {
      const result = await request('POST', '/orders', {
        items: [{
          productId: testProductId,
          quantity: 1,
        }],
        shippingAddress: 'Test Address 123',
        paymentMethod: 'credit_card',
      }, authToken);
      
      if (!result.id) {
        throw new Error('Order should have an ID');
      }
      orderId = result.id;
      console.log(`  → Created order ${orderId}`);
    });
  }
  
  await test('Get user orders', async () => {
    const result = await request('GET', '/orders', null, authToken);
    
    if (!Array.isArray(result)) {
      throw new Error('Orders should be an array');
    }
    console.log(`  → Found ${result.length} orders`);
  });
  
  if (orderId) {
    await test('Get order by ID', async () => {
      const result = await request('GET', `/orders/${orderId}`, null, authToken);
      
      if (!result.id || result.id !== orderId) {
        throw new Error('Order ID mismatch');
      }
    });
  }

  // ============================================
  // RESULTS SUMMARY
  // ============================================
  console.log(`\n${colors.yellow}
╔════════════════════════════════════════════════════════════╗
║                    TEST RESULTS                            ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}`);
  
  const total = testsPassed + testsFailed;
  const percentage = ((testsPassed / total) * 100).toFixed(1);
  
  console.log(`${colors.green}✓ Passed: ${testsPassed}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${testsFailed}${colors.reset}`);
  console.log(`${colors.blue}Total: ${total}${colors.reset}`);
  console.log(`${colors.yellow}Success Rate: ${percentage}%${colors.reset}`);
  
  if (testsFailed === 0) {
    console.log(`\n${colors.green}🎉 ALL TESTS PASSED! Integration is working correctly.${colors.reset}\n`);
  } else {
    console.log(`\n${colors.red}⚠️  Some tests failed. Please check the errors above.${colors.reset}\n`);
  }
  
  process.exit(testsFailed > 0 ? 1 : 0);
}

// Ejecutar los tests
runTests().catch(error => {
  console.error(`\n${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
