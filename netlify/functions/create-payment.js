export default async (request) => {
    if (request.method !== "GET" && request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
        return new Response("Payment service is not configured.", { status: 500 });
    }

    const referenceId = `PYAI-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

    const paymentLinkData = {
        amount: 6900,
        currency: "INR",
        accept_partial: false,
        description: "Python for AI Developers — Quick Reference Guide",
        reference_id: referenceId,
        callback_url:
            "https://python-ai-cheatsheet.netlify.app/payment-success.html",
        callback_method: "get"
    };

    const credentials = Buffer.from(
        `${keyId}:${keySecret}`
    ).toString("base64");

    try {
        const response = await fetch(
            "https://api.razorpay.com/v1/payment_links",
            {
                method: "POST",
                headers: {
                    Authorization: `Basic ${credentials}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentLinkData)
            }
        );

        const result = await response.json();

        if (!response.ok || !result.short_url) {
            console.error("Razorpay API error:", result);
            return new Response("Unable to create payment link.", {
                status: 502
            });
        }

        return new Response(null, {
            status: 302,
            headers: {
                Location: result.short_url,
                "Cache-Control": "no-store"
            }
        });
    } catch (error) {
        console.error("Payment link creation failed:", error);
        return new Response(
            "Payment service temporarily unavailable.",
            { status: 500 }
        );
    }
};