import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email"
import {
  cybersCoolBoxedTailwindConfig,
  CybersCoolFonts,
} from "../email-template"

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : "https://cyberscool.vercel.app"

export const NextStepEmail = () => (
  <Tailwind config={cybersCoolBoxedTailwindConfig}>
    <Html>
      <Head>
        <CybersCoolFonts />
      </Head>
      <Body className="bg-grayLight m-0 text-center font-sans">
        <Preview>We&apos;re almost there!</Preview>
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
                      <span className="text-fg-3">CybersCool Defcon Inc.</span>
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
                    We&apos;re almost there!
                  </Heading>
                </Section>

                <Text className="font-16 text-grayDark mx-auto mt-0 mb-8 max-w-95">
                  Thank you for attending our career orientation session.
                  <br />
                  <br />
                  We&apos;d love to help you take the next step in your
                  cybersecurity journey.
                  <br />
                  <br />
                  Please let us know your preferred contact details so we can
                  reach out and guide you through the available programs and
                  enrollment options.
                </Text>

                <Section className="mb-6 text-center">
                  <Button
                    href="https://cyberscoolph.com/consult"
                    className="font-16 to from-brandPurple via-brandPurple/80 to-brandTeal inline-block rounded-lg bg-linear-to-br px-7 py-4 text-white"
                  >
                    Set Your Contact Preferences
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

              <Section className="bg-white">
                <Row>
                  <Column className="px-6 py-10 text-center">
                    <Text className="font-13 text-fg-3 mx-auto mt-0 mb-8 max-w-70 text-center font-sans">
                      We focus on skills, not theory.
                    </Text>
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

export default NextStepEmail
