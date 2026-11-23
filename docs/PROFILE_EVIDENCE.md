# Profile and project evidence — November 23, 2026

Profile, GPA, study dates, communities, internship plans, portrait and LinkedIn were supplied by the portfolio owner. BBE, DSUC and GDGoC-DUT are presented as learning communities, not employment or organizer roles. No participation dates or awards were invented.

FoodGo: owner corrected the start date to October 2026, expected completion December 2026; three members, Driver actor lead, Kotlin/Android. The GitHub connector returned 404 for ngo-nho/Nhom9-LTTDTDD. No specific realtime transport or additional stack was asserted.

ComicHub source reviewed at 9ceaaf9322d28ad5ffb7dc25a84a09bbc1adb1fa:
- ComicApi/Services/Chat/ChatService.cs: intent routing, catalog ranking, maximum six LLM candidates, candidate-ID checking, and fallback handling for some LLM failures.
- ComicApi/Services/Chat/PromptBuilder.cs: catalog-backed prompts.
- ComicApi/wwwroot/js/pages/comic.js and Controllers/CommentsController.cs: API-based comments, list/count refresh after actions, pagination and replies. The inspected flow does not establish cross-client server-pushed updates. Do not describe it as verified WebSocket/SignalR realtime.

MusicBox source reviewed at 27f5ae2d3ac441225785bb976104dd84900dbf89:
- web/staff/dashboard.jsp: pollNotifications every 5000ms, pending summary endpoint, order actions via fetch.
- web/guest/home.jsp: checkSupportStatus every 5000ms.
- src/java/controller/staff/OrderApiServlet.java: pending/order servlet endpoints.

These observations are static source review, not end-to-end runtime verification of those applications. No usage, latency or AI-quality benchmark is claimed. Real application screenshots and public demos are still pending.
