
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hoslcbojonbcjrmgotnc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvc2xjYm9qb25iY2pybWdvdG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTA5MTUsImV4cCI6MjA4NTI2NjkxNX0.M1VNEmDqCpOsqPvDLjENmD78CYCg7ZULpKmstA8E8ag';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
