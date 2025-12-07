// src/app.d.ts

declare namespace App {
  interface Platform {
    env: {
      cf_timeline: D1Database;
    };
  }
}
