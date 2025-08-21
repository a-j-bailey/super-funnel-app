import { createClient } from '@supabase/supabase-js';
// import 'react-native-url-polyfill/auto';

const projectID = 'hodqnteylgwesuzsmszg';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvZHFudGV5bGd3ZXN1enNtc3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTY3NjcsImV4cCI6MjA2NjI5Mjc2N30.5rWt-TBOAyau2yHPbY8eUyphd3YOnTr0ObP1Or1K0Ic';

export const supabase = createClient(`https://${projectID}.supabase.co`, supabaseAnonKey);