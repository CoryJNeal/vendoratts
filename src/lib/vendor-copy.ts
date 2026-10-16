import type { Intake } from "./types";

export function vendorInstructions(intake: Intake): string {
  return [
    `Draft vendor review package for ${intake.vendorName}`,
    "",
    "We prepared these draft product records from publicly available product information on the official website you (or our team) identified. The purpose is to reduce setup effort by prepopulating fields for your review rather than asking you to complete blank style-setup forms.",
    "",
    "This information has not been verified or approved. It is website-derived only. It is not vendor-approved, not authorized for reuse, and not ready for publication.",
    "",
    "Please:",
    "1. Confirm whether each style/color belongs in the intended assortment (and for which market).",
    "2. Correct specifications, complete missing fields, and flag discontinued or replacement styles. Use Confirm, Amend, Not applicable, Provide missing information, or Needs clarification.",
    "3. Approve, replace, or reject each listed image for product accuracy. Separately confirm whether we are authorized to use those assets, and for which purpose.",
    "4. Do not treat a confirmed data row as an independent safety certification.",
    "",
    "Our internal team will review your submission before any setup or publication.",
    "",
    `Image-use permission currently on file: ${intake.imagePermission === "confirmed" ? "Confirmed" : "Not confirmed"}.`,
    intake.intendedImageUse ? `Intended image use if authorized: ${intake.intendedImageUse}.` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function acknowledgmentWording(): string {
  return [
    "Proposed acknowledgment wording for legal/commercial review (not legally sufficient; not completed):",
    "",
    "Assortment confirmation: I confirm that the styles marked for inclusion are offered for this program and market, and that styles marked as excluded, discontinued, or replaced are identified as such.",
    "",
    "Product-data confirmation: I confirm that I have reviewed the website-derived specifications, corrected inaccuracies, completed missing required fields (including safety attributes), and that vendor-confirmed values supersede draft values for setup. I understand this confirmation does not independently certify product safety or standards compliance.",
    "",
    "Image accuracy and usage authorization: I confirm that approved images depict the correct style and color. I separately authorize (or decline) the stated use of those assets. Public website accessibility is not permission to reuse images.",
    "",
    "Capture if later executed: approver name, date, approved record version, covered styles/assets, and unresolved exceptions. Later website changes are proposed updates, not automatic replacements for approved data.",
  ].join("\n");
}
