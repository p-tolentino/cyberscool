import { data } from "@/lib/hrefs"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email"

import { TailwindConfig, Font } from "react-email"
import plugin from "tailwindcss/plugin"

const colors = {
  white: "#FFFFFF",
  grayLight: "#F8F9FA",
  gray: "#7B7D81",
  grayDark: "#43454B",
  black: "#14171E",
  brandPurple: "#5d2c66",
  brandTeal: "#2ba2c3",
} as const

const fontScale = {
  11: {
    fontSize: "11px",
    fontWeight: "420",
    letterSpacing: "-0.033px",
    lineHeight: "1.5",
  },
  13: {
    fontSize: "13px",
    fontWeight: "420",
    letterSpacing: "-0.039px",
    lineHeight: "1.5",
  },
  14: { fontSize: "14px", fontWeight: "450", lineHeight: "1.5" },
  16: {
    fontSize: "16px",
    fontWeight: "420",
    letterSpacing: "-0.048px",
    lineHeight: "1.5",
  },
  24: {
    fontSize: "24px",
    fontWeight: "600",
    letterSpacing: "-0.084px",
    lineHeight: "1",
  },
  28: {
    fontSize: "28px",
    fontWeight: "600",
    letterSpacing: "-0.084px",
    lineHeight: "1.3",
  },
  32: {
    fontSize: "32px",
    fontWeight: "600",
    letterSpacing: "-0.64px",
    lineHeight: "1.25",
  },
  40: {
    fontSize: "40px",
    fontWeight: "600",
    letterSpacing: "-0.8px",
    lineHeight: "1.1",
  },
} as const

export const cybersCoolBoxedTailwindConfig: TailwindConfig = {
  plugins: [
    plugin(({ addUtilities, addVariant }) => {
      addVariant("mobile", "@media (max-width: 600px)")
      const utilities: Record<string, Record<string, string>> = {}
      for (const [step, token] of Object.entries(fontScale)) {
        utilities[`.font-${step}`] = token
      }
      addUtilities(utilities)
    }),
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ["Inter", "system-ui", "Arial", "sans-serif"],
      },
    },
  },
}

export function CybersCoolFonts() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');`,
        }}
      />
      <Font
        fontFamily="Inter"
        fallbackFontFamily={["Arial", "sans-serif"]}
        webFont={{
          url: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf",
          format: "truetype",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Inter"
        fallbackFontFamily={["Arial", "sans-serif"]}
        webFont={{
          url: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf",
          format: "truetype",
        }}
        fontWeight={500}
        fontStyle="normal"
      />
      <Font
        fontFamily="Inter"
        fallbackFontFamily={["Arial", "sans-serif"]}
        webFont={{
          url: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
          format: "truetype",
        }}
        fontWeight={600}
        fontStyle="normal"
      />
    </>
  )
}

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : "https://cyberscool.vercel.app"

interface JoinEmailProps {
  firstName: string
  companyName: string
  zoomUrl: string
  orientationDateTime: string
}

export const JoinEmail = ({
  firstName,
  companyName,
  zoomUrl,
  orientationDateTime,
}: JoinEmailProps) => (
  <Tailwind config={cybersCoolBoxedTailwindConfig}>
    <Html>
      <Head>
        <CybersCoolFonts />
      </Head>
      <Body className="bg-grayLight m-0 text-center font-sans">
        <Preview>
          Hi, {firstName}! Ready to Start Your Cybersecurity Journey?
        </Preview>
        <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-160">
          <Section>
            <Section className="mobile:px-2 bg-white px-6 py-4">
              <Section className="mb-3 px-6">
                <Row>
                  <Column className="w-1/2 py-1.75 align-middle">
                    <Row>
                      <Column className="w-8 align-middle">
                        <Img
                          src={`${baseUrl}/logo.png`}
                          alt=""
                          width={23}
                          className="block"
                        />
                      </Column>
                    </Row>
                  </Column>
                  <Column align="right" className="w-1/2 py-1.75 align-middle">
                    <Text className="font-13 m-0 text-right font-sans">
                      <span className="text-fg-3">{companyName}</span>
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Section className="bg-grayLight mobile:px-6 mobile:py-12 rounded-[8px] px-10 py-16 text-center">
                <Section className="mb-3">
                  <Img
                    src={`${baseUrl}/logo.png`}
                    alt="Logo"
                    width={48}
                    className="mx-auto mb-5 block"
                  />
                  <Heading as="h1" className="font-28 m-0 font-sans text-black">
                    Hi, {firstName}!
                  </Heading>
                </Section>

                <Text className="font-16 text-grayDark mx-auto mt-0 mb-8 max-w-95">
                  Thank you for signing up for our short webinar.
                  <br />
                  <br />
                  Your orientation is scheduled for
                  <br />
                  <strong>{orientationDateTime}.</strong>
                  <br />
                  <br />
                  To join, simply click the button below.
                </Text>

                <Section className="mb-6 text-center">
                  <Button
                    href={zoomUrl}
                    className="font-16 to from-brandPurple via-brandPurple/80 to-brandTeal inline-block rounded-lg bg-linear-to-br px-7 py-4 text-white"
                  >
                    Join Zoom Meeting
                  </Button>
                </Section>

                <Text className="font-13 text-gray mx-auto mt-8 max-w-100">
                  {process.env.CONTACT_EMAIL &&
                    `If you have any concerns, please contact us at ${process.env.CONTACT_EMAIL!}.`}
                  <br />
                  <br />
                  If you didn&apos;t request this, please ignore this email.
                </Text>
              </Section>

              {/* Footer */}
              <Section className="bg-white">
                <Row>
                  <Column className="px-6 py-10 text-center">
                    <Text className="font-13 text-fg-3 mx-auto mt-0 mb-8 max-w-70 text-center font-sans">
                      We focus on skills, not theory.
                    </Text>

                    <Section className="mb-8">
                      {data().socialLinks.map(({ label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          className="inline-block px-2 align-middle"
                        >
                          <Img
                            src={
                              label === "Facebook"
                                ? `${baseUrl}/socials/facebook-logo.png`
                                : `${baseUrl}/socials/in-icon.png`
                            }
                            alt={label}
                            width={label === "Facebook" ? 32 : 24}
                            className="text-brandPurple block"
                          />
                        </Link>
                      ))}
                    </Section>

                    {/* <Text className="font-11 text-fg-3 mt-4 mb-5 text-center font-sans">
                      123 Market Street, Floor 1
                      <br />
                      Tech City, CA, 94102
                    </Text> */}
                  </Column>
                </Row>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

export default JoinEmail
