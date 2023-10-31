import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohbeiwbegjoivdxuljom.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYmVpd2JlZ2pvaXZkeHVsam9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NzU3MDIsImV4cCI6MjAxNDI1MTcwMn0.Zj7-PJem6MIJwe2GPMhTL8xYwfA5ISnrBfKzyhMremk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
