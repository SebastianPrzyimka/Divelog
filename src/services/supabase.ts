import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://vwnyxszablszztdvilza.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3bnl4c3phYmxzenp0ZHZpbHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODI4MTAsImV4cCI6MjA3MTQ1ODgxMH0.VErI2NVZRx91vEjX1kA57Mnz0tVskj2Wcdn35VluqNE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
