/**
 * Centralized UPI Contribution Configuration
 *
 * Update `recipientUpiId` with your genuine Virtual Payment Address (VPA)
 * when ready to accept live contributions (e.g. "username@bank").
 *
 * If left as the default "YOUR_UPI_ID@BANK" placeholder, payment link generation
 * is disabled and a helpful development-safe message is displayed.
 */

export interface ContributionConfig {
    /** The recipient's Virtual Payment Address (UPI ID) */
    recipientUpiId: string;
    /** The recipient display name shown in UPI applications */
    recipientName: string;
    /** Standard currency code (INR for UPI) */
    currency: "INR";
    /** Short description for the payment note */
    transactionNote: string;
}

export const CONTRIBUTION_CONFIG: ContributionConfig = {
    // Default placeholder as required by specification
    recipientUpiId: "deepakprajapat3314@oksbi",
    recipientName: "Deepak Prajapat",
    currency: "INR",
    transactionNote: "Support HalloweenVerse",
};

/**
 * Checks whether the configured UPI ID is a valid, configured ID and NOT the placeholder.
 */
export function isConfiguredUpiId(upiId?: string): boolean {
    if (!upiId) return false;
    const trimmed = upiId.trim();
    if (!trimmed || trimmed === "YOUR_UPI_ID@BANK") {
        return false;
    }
    // Standard UPI ID pattern: identifier@bank (e.g. user@okhdfcbank, 9876543210@paytm)
    return /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(trimmed);
}

/**
 * Builds a standard UPI payment URI (`upi://pay?...`) with URL-encoded query parameters.
 * Amount is deliberately omitted so the contributor can enter any voluntary amount in their UPI app.
 *
 * Returns null if the configured UPI ID is invalid or remains the placeholder.
 */
export function buildUpiPaymentUri(config: ContributionConfig = CONTRIBUTION_CONFIG): string | null {
    if (!isConfiguredUpiId(config.recipientUpiId)) {
        return null;
    }

    const params = new URLSearchParams({
        pa: config.recipientUpiId.trim(),
        pn: config.recipientName.trim(),
        cu: config.currency,
        tn: config.transactionNote.trim(),
    });

    return `upi://pay?${params.toString()}`;
}
