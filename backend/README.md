# Backend

Minimal Express backend starter for Chat Firebase App.

## Run

1. Install dependencies:
   npm install
2. Copy environment file:
   copy .env.example .env
3. Start dev server:
   npm run dev

Health check endpoint:

- GET /api/health

## OTP / SMS notes

If you get Twilio error `21212` (`Invalid From Number`) when test OTPs are disabled in Supabase:

- Open Supabase Dashboard -> Auth -> Phone.
- Verify your Twilio sender config is valid.
- Use either:
  - A real Twilio phone number in E.164 format (`+1...`), or
  - A Twilio Messaging Service SID (`MG...`).
- Do not use a Twilio Verify Service SID (`VA...`) as a sender value.

Supabase "Test Phone Numbers and OTPs" bypasses real SMS delivery, so misconfiguration appears only when tests are disabled.
