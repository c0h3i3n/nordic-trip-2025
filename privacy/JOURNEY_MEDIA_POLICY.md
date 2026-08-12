# Journey Media Privacy Policy

This policy applies to every photo considered for the Nordic Trip 2025 website. Its priority order is:

1. Privacy
2. Data minimization
3. Website quality
4. Number of photos

## Locked scope

- The only authorized travel dates are **2025-07-12 through 2025-07-29, inclusive**.
- A reviewer or processing tool may inspect only an explicitly named source file that is already known to fall within that date range.
- Access is **single-file allowlist only**. Directory recursion, broad globbing, album-wide enumeration, timeline-wide enumeration, and exploratory browsing are prohibited.
- Do not inspect another date, year, album, NAS folder, or unrelated file without new, explicit authorization.
- NAS and other source originals are read-only. Never modify, rename, move, or delete an original.

## Minimum permitted analysis

Read only the minimum information needed to answer this binary question:

> Is this image a SAFE, publicly shareable travel, environment, object, or food photo?

Permitted inputs are limited to the explicitly allowlisted file, its known travel date, and the minimum visual review needed for the SAFE decision. Do not create or retain unnecessary image descriptions.

The following activities are prohibited:

- face recognition, face matching, person identification, person clustering, or face embeddings;
- identity, age, gender, relationship, or other personal-attribute inference;
- person profiles, face indexes, or links between people across photos;
- OCR, transcription, extraction, or summarization of sensitive text or codes;
- scanning or cataloging files outside the locked scope.

## SAFE content

A photo may be approved only when its primary content is one or more of the following:

- scenery or natural landscape;
- attraction, architecture, or street scene;
- food or drink;
- product, travel object, or other non-personal object;
- a non-identifying environment.

It must also contain no clearly identifiable person, sensitive personal data, private document, or detail that exposes a home or accommodation location.

## Mandatory exclusion

Exclude a photo if it contains or may expose:

- a clear or identifiable person or face;
- a passport, identity document, boarding pass, payment card, QR code, or barcode;
- an address, phone number, email address, license plate, room number, school information, or medical information;
- a private chat, private screen, or other private personal information;
- a home location, accommodation room, or similarly sensitive location detail;
- content whose safety cannot be established confidently.

**When in doubt, exclude.** Photo quantity must never justify a lower privacy standard.

## Publication copies and metadata

- Every published image must be an independent website copy. Never publish or alter the source original in place.
- Before publication, strip GPS coordinates, device and camera details, camera serial numbers, author information, source paths, and all other unnecessary EXIF, XMP, IPTC, or identifying metadata.
- A capture date may exist only in non-public site data when the timeline requires it. It must not remain in public image metadata.
- Do not retain face data, embeddings, identity guesses, person descriptions, or an unnecessary permanent copy of a source photo.
- Delete temporary downloads, previews, contact sheets, and intermediate files as soon as the review or conversion is complete.

## Manual SAFE review and allowlist

- Each candidate must pass a manual privacy review immediately before publication.
- Only a file marked **SAFE** may be added to the explicit publication allowlist.
- The allowlist must name each public output file individually and associate it only with an in-scope travel date. It must not authorize a directory, wildcard, date range expansion, or recursive scan.
- If an approved file is replaced or edited, it must pass a new manual SAFE review before publication.
- Files that are excluded or no longer referenced must be removed from the current public artifact so that an old direct URL cannot expose them.

## Publication gate

Deployment must fail unless the automated privacy check succeeds. That check must verify at minimum:

- all published journey images are explicitly allowlisted and all allowlisted files exist;
- every allowlist date falls within 2025-07-12 through 2025-07-29;
- no unreviewed journey image is present in the public artifact;
- published copies contain no prohibited or unnecessary metadata.

The automated gate supplements the manual SAFE review; it does not replace visual privacy judgment. Any requested feature that would violate this policy must stop until the owner gives explicit authorization to change the relevant scope or rule.
