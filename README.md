AWS Static Website Deployment
Hosted on AWS S3 + CloudFront

This project is a fully deployed static website hosted on AWS S3, with CloudFront for global distribution.

Features
S3 Bucket for static file hosting

CloudFront as a CDN for faster content delivery

GitHub Repository for version control

How I Deployed It
1-Create an S3 Bucket
Enabled static website hosting

Uploaded index.html, style.css, and script.js

Made the bucket public (or used CloudFront with restricted access)

2-Set Up CloudFront
Created a CloudFront distribution pointing to the S3 bucket

Configured caching and security settings

Used the CloudFront URL to serve the website

Linked CloudFront with an SSL certificate (via ACM)

How to View the Website
Live Site: [https://d2bm0rnny1hpd5.cloudfront.net]