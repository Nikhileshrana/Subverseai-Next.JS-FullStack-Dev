"use client"
export default function Component() {
    return (
      <section className="bg-[#F1F5F9] dark:bg-[black] py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-[#334155]">HIPAA Compliance</h1>
              <p className="text-[#64748B] dark:text-[#94A3B8]">
                Health Insurance Portability and Accountability Act (HIPAA), enacted in 1996, is a collection of closely aligned regulations created to protect private and sensitive patients’ electronic health records. The HIPAA Compliance process involves securing and maintaining private and sensitive patient health data (PHI).
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#334155]">SubVerse AI HIPAA Commitment</h2>
              <p className="text-[#64748B] dark:text-[#94A3B8]">
                Subverseai.com has implemented reasonable physical, technical and administrative security measures to protect personal information from loss, misuse, alteration or destruction. Our service providers and agents are contractually bound to maintain the confidentiality of personal information and may not use the information for any unauthorized purpose. Subverseai.com will ensure through formally executed contracts that the service providers are committed to “same level of data protection” as applicable data protection laws and regulations.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#334155]">Our HIPAA Checklist</h2>
              <ul className="list-disc list-inside text-[#64748B] dark:text-[#94A3B8]">
                <li>Assigned a Security & Privacy Officer within the organization.</li>
                <li>Established privacy policies within the organization.</li>
                <li>Established security procedures (administrative, physical, technical) to protect PHI.</li>
                <li>Established Business Associate Agreements with respective vendors.</li>
                <li>Trained staff as per HIPAA guidelines.</li>
                <li>Implemented annual risk assessment (2022) to avoid data breaches.</li>
                <li>Established a breach notification protocol.</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#334155]">Contact Us</h2>
              <p className="text-[#64748B] dark:text-[#94A3B8]">
                For complete information, please refer to our DPA, Terms of Service & Privacy Policy documents. If you have any queries, please feel free to write to our Data Protection Officer at info@subverseai.com. Our HIPAA team will be more than happy to help you out.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
