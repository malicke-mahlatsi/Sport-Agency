import React from 'react';

const PrintStyles = () => {
  return (
    <style jsx global>{`
      @media print {
        /* OPTIMIZED Print Styles for Professional Documents */
        
        /* Hide non-essential elements */
        nav, 
        footer, 
        .no-print, 
        button:not(.print-button), 
        .social-proof-badges,
        .back-to-top,
        .loading-bar,
        .mobile-menu,
        .scroll-indicator,
        .floating-elements {
          display: none !important;
        }
        
        /* Reset all backgrounds and colors for print */
        * {
          color: black !important;
          background: white !important;
          box-shadow: none !important;
          text-shadow: none !important;
          border-color: #ccc !important;
        }
        
        /* Ensure proper page layout */
        body {
          font-size: 12pt !important;
          line-height: 1.4 !important;
          color: black !important;
          background: white !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Athlete profile print layout */
        .athlete-profile {
          page-break-inside: avoid;
          margin-bottom: 2cm;
        }
        
        .athlete-profile h1,
        .athlete-profile h2,
        .athlete-profile h3 {
          color: black !important;
          font-weight: bold !important;
          margin-top: 1cm !important;
          margin-bottom: 0.5cm !important;
        }
        
        /* Ensure images print properly */
        img {
          max-width: 100% !important;
          height: auto !important;
          page-break-inside: avoid;
          border: 1px solid #ccc !important;
        }
        
        /* Table styling for stats */
        table {
          border-collapse: collapse !important;
          width: 100% !important;
          margin: 1cm 0 !important;
        }
        
        th, td {
          border: 1px solid #ccc !important;
          padding: 0.5cm !important;
          text-align: left !important;
        }
        
        th {
          background: #f0f0f0 !important;
          font-weight: bold !important;
        }
        
        /* Page breaks */
        .page-break {
          page-break-after: always;
        }
        
        .page-break-before {
          page-break-before: always;
        }
        
        .no-page-break {
          page-break-inside: avoid;
        }
        
        /* Headers and footers */
        @page {
          margin: 2cm;
          size: A4;
          
          @top-center {
            content: "Elite Sports Agency - Professional Profile";
            font-size: 10pt;
            color: #666;
          }
          
          @bottom-center {
            content: "Page " counter(page) " of " counter(pages);
            font-size: 10pt;
            color: #666;
          }
          
          @bottom-left {
            content: "Confidential Document";
            font-size: 8pt;
            color: #999;
          }
          
          @bottom-right {
            content: "www.elitesportsagency.com";
            font-size: 8pt;
            color: #999;
          }
        }
        
        /* Specific component print styles */
        .testimonial-card {
          border: 1px solid #ccc !important;
          padding: 1cm !important;
          margin: 0.5cm 0 !important;
          page-break-inside: avoid;
        }
        
        .stats-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 1cm !important;
          margin: 1cm 0 !important;
        }
        
        .faq-item {
          border: 1px solid #ddd !important;
          padding: 0.5cm !important;
          margin: 0.5cm 0 !important;
        }
        
        .faq-question {
          font-weight: bold !important;
          margin-bottom: 0.3cm !important;
        }
        
        /* Contact information styling */
        .contact-info {
          border: 2px solid #000 !important;
          padding: 1cm !important;
          margin: 1cm 0 !important;
          background: #f9f9f9 !important;
        }
        
        /* Logo and branding */
        .logo {
          max-height: 3cm !important;
          margin-bottom: 1cm !important;
        }
        
        /* Typography hierarchy for print */
        h1 { font-size: 18pt !important; }
        h2 { font-size: 16pt !important; }
        h3 { font-size: 14pt !important; }
        h4 { font-size: 12pt !important; }
        h5 { font-size: 11pt !important; }
        h6 { font-size: 10pt !important; }
        
        p, li, td, th {
          font-size: 10pt !important;
          line-height: 1.4 !important;
        }
        
        /* Links */
        a {
          color: black !important;
          text-decoration: underline !important;
        }
        
        a:after {
          content: " (" attr(href) ")";
          font-size: 8pt;
          color: #666;
        }
        
        /* QR Code placeholder for digital links */
        .qr-code-placeholder {
          width: 3cm !important;
          height: 3cm !important;
          border: 1px solid #ccc !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 8pt !important;
          color: #666 !important;
        }
        
        /* Signature lines */
        .signature-line {
          border-bottom: 1px solid #000 !important;
          width: 6cm !important;
          height: 1cm !important;
          margin: 2cm 0 0.5cm 0 !important;
        }
        
        .signature-label {
          font-size: 8pt !important;
          color: #666 !important;
          margin-top: 0.2cm !important;
        }
        
        /* Print-specific utility classes */
        .print-only {
          display: block !important;
        }
        
        .screen-only {
          display: none !important;
        }
        
        .print-landscape {
          page-orientation: landscape;
        }
        
        .print-portrait {
          page-orientation: portrait;
        }
      }
      
      /* Print preview styles (when print dialog is open) */
      @media screen and (prefers-color-scheme: print) {
        body {
          background: white;
          color: black;
        }
      }
    `}</style>
  );
};

export default PrintStyles;