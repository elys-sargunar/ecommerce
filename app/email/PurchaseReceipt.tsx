import { Html, Body, Head, Heading, Container, Preview, Tailwind } from "@react-email/components"
import { OrderInformation } from "./components/OrderInformation"

type PurchaseReceiptEmailProps = {
    product: {
        name: string,
        imagePath: string,
        description: string,
    },
    order: {
        id: string
        createdAt: Date,
        pricePaidInPence: number,
    },
    downloadVerificationId: string
}

PurchaseReceiptEmail.PreviewProps = {
    product: { 
        name: "Product Name", 
        imagePath: "/products/3ed58bfd-d8f5-4159-aac9-62cf887ff65b-IMG-20190828-WA0012.jpg",
        description: "dsfdsfsfdsd"
    },
    order: {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInPence: 100000,        
    },
    downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail( {product, order, downloadVerificationId} : PurchaseReceiptEmailProps ) {
    return (
        <Html>
            <Preview>Download {product.name} and view receipt</Preview>
            <Tailwind>
                <Head>

                </Head>
                <Body className="font-sans bg-white">
                    <Container className="max-w-x1">
                        <Heading>
                            Purchase Receipt
                        </Heading>
                        <OrderInformation 
                            order={order} 
                            product={product} 
                            downloadVerificationId={downloadVerificationId}
                        />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}