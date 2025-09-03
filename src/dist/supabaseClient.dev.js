"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supabase = void 0;

var _supabaseJs = require("@supabase/supabase-js");

var supabaseUrl = "https://cegzbqxhkitalnpodvlv.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZ3picXhoa2l0YWxucG9kdmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMjI3MTEsImV4cCI6MjA2OTY5ODcxMX0.s9-dUNJCwLwApIG2RbSri24CS0FXxkJq8gm2YZwPpks";
var supabase = (0, _supabaseJs.createClient)(supabaseUrl, supabaseAnonKey);
exports.supabase = supabase;