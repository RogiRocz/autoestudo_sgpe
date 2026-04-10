import { Card } from "@/components/ui/card"
import { Container } from "@/components/ui/grid"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container className="mx-0 flex min-h-screen items-center justify-center bg-chart-2 px-0">
      <Card className="h-[70vh] w-[40vw] bg-primary text-primary-foreground shadow-xl/30">
        {children}
      </Card>
    </Container>
  )
}
