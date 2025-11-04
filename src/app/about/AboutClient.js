"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { TextHoverEffect } from "../../components/ui/text-hover-effect";
import { InfiniteMovingCards } from "../../components/ui/infinite-moving-cards";
import BackgroundEffects from "../../components/BackgroundEffects";
import {
  IconMapPin,
  IconSchool,
  IconCake,
  IconStar,
  IconCode,
  IconHeart,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";
import { socials } from "../../config/socials";

export default function AboutClient() {
  return (
    <>
      <BackgroundEffects />

      <div className="relative min-h-screen text-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left - Profile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden max-w-md mx-auto md:mx-0">
                  <Image
                    src="/avatar.webp"
                    alt="Alexi Roth Luis Cañamo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="space-y-3 text-white/60">
                  <div className="flex items-center gap-2">
                    <IconCake className="w-4 h-4" />
                    <span>18 years old</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconMapPin className="w-4 h-4" />
                    <span>Manila, Philippines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconSchool className="w-4 h-4" />
                    <span>CS Sophomore @ ADMU</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconStar className="w-4 h-4" />
                    <span>DOST Merit Scholar</span>
                  </div>
                </div>
              </motion.div>

              {/* Right - Intro */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Hey, I'm Alexi! 👋
                  </h1>
                  <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
                </div>

                <div className="space-y-4 text-lg text-white/70 leading-relaxed">
                  <p>
                    I'm an 18-year-old developer from Manila who's been obsessed
                    with code since I was 7. What started as curiosity watching
                    my aunts and uncles work on projects turned into a
                    full-blown passion.
                  </p>
                  <p>
                    Now I'm a CS sophomore at Ateneo, building things that
                    actually help people. My philosophy is simple:{" "}
                    <span className="text-pink-400 font-semibold">
                      "code for others"
                    </span>
                    .
                  </p>
                  <p>
                    I believe{" "}
                    <span className="text-yellow-400 font-semibold">
                      "we can just do things"
                    </span>{" "}
                    — no permission needed. Just build, ship, and make an
                    impact.
                  </p>
                  <p className="text-white/60 text-base pt-4">
                    When I'm not coding: playing games 🎮, going out with my
                    friends 🌟, and exploring new ideas 💡
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Life in Motion - Infinite Scroll */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Life in Motion
              </h2>
              <div className="h-1 w-20 bg-blue-500 rounded-full mb-4 mx-auto" />
              <p className="text-white/60 text-lg">
                Coffee, code, cameras, and everything in between
              </p>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <InfiniteMovingCards
              items={[
                <div
                  key="1"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (1).webp"
                    alt="Life moment 1"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="2"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (2).webp"
                    alt="Life moment 2"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="3"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (3).webp"
                    alt="Life moment 3"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="4"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (4).webp"
                    alt="Life moment 4"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="5"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (5).webp"
                    alt="Life moment 5"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="6"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (6).webp"
                    alt="Life moment 6"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="7"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (7).webp"
                    alt="Life moment 7"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="8"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (8).webp"
                    alt="Life moment 8"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="9"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (9).webp"
                    alt="Life moment 9"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="10"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (10).webp"
                    alt="Life moment 10"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="11"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (11).webp"
                    alt="Life moment 11"
                    fill
                    className="object-cover"
                  />
                </div>,
                <div
                  key="12"
                  className="relative w-[450px] h-[500px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/images/about/image (12).webp"
                    alt="Life moment 12"
                    fill
                    className="object-cover"
                  />
                </div>,
              ]}
              direction="left"
              speed="slow"
            />
          </div>
        </section>

        {/* My Story */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                How It Started
              </h2>
              <div className="h-1 w-20 bg-blue-500 rounded-full mb-4 mx-auto" />
              <p className="text-white/60 text-lg">The origin story</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6 text-lg text-white/70 leading-relaxed"
              >
                <p>
                  I was{" "}
                  <span className="text-white font-semibold">7 years old</span>{" "}
                  when I first saw my aunts and uncles working on a{" "}
                  <span className="text-white font-semibold">Visual Basic</span>{" "}
                  project. They had these three radio buttons, and when you
                  clicked one, a picture would change on screen. To
                  seven-year-old me, it looked like magic.
                </p>

                <p>
                  My family showed me how to make websites with{" "}
                  <span className="text-white font-semibold">Wix</span>, and I
                  immediately started creating sites about my favorite games and
                  toys. Soon I was building a web browser called{" "}
                  <span className="text-white font-semibold">IcyFox</span>{" "}
                  (yeah, I basically copied Firefox). I made{" "}
                  <span className="text-white font-semibold">
                    seven versions
                  </span>
                  , each one slightly better.
                </p>

                <p>
                  During the pandemic, I discovered{" "}
                  <span className="text-white font-semibold">
                    The Odin Project
                  </span>{" "}
                  and finally learned to actually understand code instead of
                  just copying it. Built a calculator, sketchpad,
                  rock-paper-scissors — each one taught me something new.
                </p>

                <p>
                  Now I'm at{" "}
                  <span className="text-white font-semibold">Ateneo</span> as a{" "}
                  <span className="text-white font-semibold">
                    DOST Merit Scholar
                  </span>
                  , building tools that thousands of students use — the{" "}
                  <span className="text-white font-semibold">
                    Enlistment Helper
                  </span>
                  ,{" "}
                  <span className="text-white font-semibold">
                    QPI Calculator
                  </span>
                  , and{" "}
                  <span className="text-white font-semibold">
                    One Big Match
                  </span>
                  . Currently serving as{" "}
                  <span className="text-white font-semibold">AVP at MISA</span>{" "}
                  while interning at{" "}
                  <span className="text-white font-semibold">NextPay</span>.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white/10"
              >
                <Image
                  src="/images/about/baby.webp"
                  alt="Baby Alexi"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                  <p className="text-white/80 text-sm">
                    Where it all started ✨
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="relative py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why I Build Things
              </h2>
              <div className="h-1 w-20 bg-blue-500 rounded-full mb-4 mx-auto" />
              <p className="text-white/60 text-lg">The philosophy</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                  <div className="pl-6 border-l-2 border-pink-500">
                    <p className="text-pink-400 font-semibold text-xl mb-3">
                      "Coding for others"
                    </p>
                    <p>
                      At Ateneo, they teach the Jesuit idea of being a "person
                      for others." That's when it clicked. I don't build for my
                      portfolio or to pad my resume. I build because students
                      need better tools, communities need better platforms, and
                      real problems need real solutions.
                    </p>
                    <p>
                      The "thank yous" from students using the QPI calculator
                      during finals week, seeing the Enlistment Helper actually
                      help people get into classes they need. These weren't
                      super big new inventions, but they were small ways to
                      help, using code. And that became my biggest motivation.
                    </p>
                  </div>

                  <div className="pl-6 border-l-2 border-blue-500">
                    <p className="text-blue-400 font-semibold text-xl mb-3">
                      "We can just do things"
                    </p>
                    <p>
                      I believe in human agency. See a problem? Build the
                      solution. Have an idea? Ship it. The gap between "this
                      should exist" and "I made this exist" is just action. No
                      gatekeepers, no waiting for permission. We can just do
                      things.
                    </p>
                    <p>
                      My advice is simple: Start. Even if you feel like you're
                      starting late, it's never too late if it's something you
                      really want to try. It's going to be hard. There will be
                      moments when you're stuck on a problem you can't fix. But
                      if it's something you're passionate about, it'll be worth
                      it.
                    </p>
                  </div>

                  <p>
                    Here's what keeps me going: it's not the technical
                    challenges (though those are fun). It's knowing that
                    something I built is making someone's day a little easier.
                    That feeling of making a difference, however small, is way
                    more satisfying than solving any coding problem.
                  </p>

                  <p className="text-white font-semibold text-xl pt-4">
                    I code for others. And that's a pretty powerful reason to
                    code.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bionote */}
        <section className="relative py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="space-y-6">
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    <span className="text-white font-semibold text-xl">
                      Alexi Cañamo
                    </span>{" "}
                    discovered a love for coding at 7, watching his aunts and
                    uncles work on a Visual Basic project.
                  </p>
                  <p>
                    From building seven versions of a browser called IcyFox to
                    surviving tutorial hell during the pandemic with The Odin
                    Project, Alexi learned that the best way to understand code
                    is to build things that actually help people.
                  </p>
                  <p>
                    Now a 2nd-year CS student at Ateneo and DOST Merit Scholar,
                    he's built tools used by thousands — the{" "}
                    <span className="text-white font-semibold">
                      Ateneo Enlistment Helper
                    </span>{" "}
                    and{" "}
                    <span className="text-white font-semibold">
                      QPI Calculator
                    </span>
                    . He founded{" "}
                    <span className="text-white font-semibold">
                      One Big Match
                    </span>
                    , a matchmaking app for seamless event icebreakers, because
                    networking shouldn't be awkward.
                  </p>
                  <p>
                    As AVP for Skills and Development at MISA and a Software
                    Engineering Intern at NextPay (a Filipino fintech startup),
                    Alexi's mission is simple: build things that solve real
                    problems, ship fast, and make an impact.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-4">Connect with me</p>
                  <div className="grid grid-cols-2 sm:flex gap-3">
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300 text-white/70 hover:text-white"
                    >
                      <IconBrandGithub className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm whitespace-nowrap">GitHub</span>
                    </a>
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300 text-white/70 hover:text-white"
                    >
                      <IconBrandLinkedin className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm whitespace-nowrap">
                        LinkedIn
                      </span>
                    </a>
                    <a
                      href={socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300 text-white/70 hover:text-white"
                    >
                      <IconBrandInstagram className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm whitespace-nowrap">
                        Instagram
                      </span>
                    </a>
                    <a
                      href={`mailto:${socials.email}`}
                      className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300 text-white/70 hover:text-white"
                    >
                      <IconMail className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm whitespace-nowrap">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Big CTA with TextHoverEffect */}
        <section className="relative py-8 md:py-32 px-6 overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <div className="h-64 w-full flex items-center justify-center mb-8">
              <div className="w-full">
                <TextHoverEffect text="ALEXI" />
              </div>
            </div>

            <p className="text-white/60 text-xl mb-8 max-w-2xl mx-auto">
              Got an idea? Want to collaborate on something cool?
              <br />
              <span className="text-white">Let's make it happen.</span>
            </p>

            <a
              href={`mailto:${socials.email}`}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </a>
          </motion.div>
        </section>
      </div>
    </>
  );
}
