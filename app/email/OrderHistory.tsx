import { Html, Body, Head, Heading, Container, Preview, Tailwind, Hr } from "@react-email/components"
import { OrderInformation } from "./components/OrderInformation"
import React from "react"

type OrderHistoryEmailProps = {
    orders: {
        id: string,
        pricePaidInPence: number,
        createdAt: Date,
        downloadVerificationId: string,
        product: {
            name: string,
            imagePath: string,
            description: string,
        }
    }[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInPence: 100000,
            downloadVerificationId: crypto.randomUUID(),
            product: { 
                name: "Product Name", 
                imagePath: "/products/3ed58bfd-d8f5-4159-aac9-62cf887ff65b-IMG-20190828-WA0012.jpg",
                description: "some description"
            },        
        },
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInPence: 60000,
            downloadVerificationId: crypto.randomUUID(),
            product: { 
                name: "Product Name 2", 
                imagePath: "/products/c2495451-3e5e-4e86-9568-9c43af18c668-event2.jpg",
                description: "some other description"
            },        
        }
    ],
    } satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail( {orders} : OrderHistoryEmailProps ) {
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head>

                </Head>
                <Body className="font-sans bg-white">
                    <Container className="max-w-x1">
                        <Heading>
                            Order History
                        </Heading>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <OrderInformation 
                                    order={order} 
                                    product={order.product} 
                                    downloadVerificationId={order.downloadVerificationId}
                                    />
                                    {index < orders.length - 1 && <Hr />}
                            </React.Fragment>
                        ))}                                                
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}