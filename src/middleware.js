import { NextResponse } from "next/server";

const markdownPages = {
  "/": `# Alexi Cañamo

18-year-old software developer from Manila, Philippines. Computer Science sophomore at Ateneo de Manila University and DOST Merit Scholar.

## Featured Projects
- **QPI Calculator** — 9.6k+ users, #2 Google result for "QPI calculator"
- **Enlistment Helper** — 10k+ visits during enlistment cycles
- **One Big Match** — Matchmaking app for org events

## Recent Blog Posts
- The Art of Failing Forward
- How a startup bootcamp shifted my perspective
- How a Canteen App Gave Me Admin Access

## Links
- Portfolio: https://alexi.life
- GitHub: https://github.com/itsalexi
- LinkedIn: https://linkedin.com/in/alexicanamo
`,
  "/about": `# About Alexi Cañamo

Started coding at age 7, inspired by a family Visual Basic project. Built a browser called IcyFox (7 versions!) as a kid. Learned real coding via The Odin Project during the pandemic.

## Education
- BS Computer Science, Ateneo de Manila University (Class of 2028)
- DOST Merit Scholar

## Work
- Head of Product & Engineering @ Sip & Scale
- Product/Engineering @ NextFinancial
- Former SWE Intern @ NextPay (YC W21)

## Philosophy
- "Code for others" — build things that help people
- "We can just do things" — no permission needed

## Links
- Portfolio: https://alexi.life
- GitHub: https://github.com/itsalexi
- LinkedIn: https://linkedin.com/in/alexicanamo
`,
  "/projects": `# Projects

## Featured
- **Ateneo QPI Calculator** — Grade calculator used by thousands of Ateneo students
- **Enlistment Helper** — Course enlistment tool with 10k+ visits
- **One Big Match** — Matchmaking app for org events
- **MISA Registration System** — 500+ users
- **TEDxADMU Website** — Co-led development

## Links
- GitHub: https://github.com/itsalexi
- Portfolio: https://alexi.life
`,
};

export function middleware(request) {
  const accept = request.headers.get("accept") || "";

  if (accept.includes("text/markdown")) {
    const pathname = request.nextUrl.pathname;
    const md = markdownPages[pathname] || markdownPages["/"];

    return new NextResponse(md, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/about", "/projects"],
};
