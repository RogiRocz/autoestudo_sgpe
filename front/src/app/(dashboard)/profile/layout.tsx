import { Container } from '@/components/ui/grid'

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="py-10 bg-background min-h-screen">
            <Container>
                <div className="mb-8 border-b pb-4">
                    <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
                    <p className="text-muted-foreground">
                        Gerencie suas informações pessoais e configurações de conta.
                    </p>
                </div>
                {children}
            </Container>
        </main>
    )
}