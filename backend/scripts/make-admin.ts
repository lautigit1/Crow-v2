import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function makeAdmin(email: string) {
  try {
    console.log(`🔍 Buscando usuario con email: ${email}`);
    
    // Buscar usuario por email
    const { data: users, error: searchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);
    
    if (searchError) {
      console.error('❌ Error al buscar usuario:', searchError);
      return;
    }
    
    if (!users || users.length === 0) {
      console.error('❌ Usuario no encontrado');
      return;
    }
    
    const user = users[0];
    console.log(`✅ Usuario encontrado: ${user.full_name || user.email}`);
    console.log(`   Rol actual: ${user.role}`);
    
    if (user.role === 'admin') {
      console.log('ℹ️  El usuario ya es admin');
      return;
    }
    
    // Actualizar rol a admin
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('user_id', user.user_id);
    
    if (updateError) {
      console.error('❌ Error al actualizar rol:', updateError);
      return;
    }
    
    console.log('✅ Usuario actualizado a admin exitosamente!');
    console.log(`   Email: ${user.email}`);
    console.log(`   Rol: authenticated → admin`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Obtener email del argumento de línea de comandos
const email = process.argv[2];

if (!email) {
  console.error('❌ Error: Debes proporcionar un email');
  console.log('');
  console.log('Uso:');
  console.log('  npm run make-admin <email>');
  console.log('');
  console.log('Ejemplo:');
  console.log('  npm run make-admin usuario@example.com');
  process.exit(1);
}

makeAdmin(email).then(() => {
  console.log('');
  console.log('✨ Proceso completado');
  process.exit(0);
});
