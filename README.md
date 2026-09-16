# Python Fundamentals to AI — Quick Reference Guide

Landing page for the **Python for AI Developers — Quick Reference Guide V1.0**.

## Files

- `index.html` — product landing page
- `style.css` — responsive UI
- `payment-success.html` — Razorpay callback/success page
- `favicon.svg` — website favicon

## Important

`create_payment_link.py` is intentionally **not included** in this GitHub-ready version. Razorpay API secrets should never be committed to GitHub.

The current Razorpay URL in `index.html` is a temporary/previous payment link. Before public launch, replace the CTA with the dynamic Netlify Function flow.

## Planned production flow

Instagram → Landing Page → Dynamic Razorpay Payment Link → Payment → `payment-success.html` → Google Form → PDF delivery.

## Deployment

This site can be connected to GitHub and deployed through Netlify. Netlify can automatically redeploy when changes are pushed to the repository.
