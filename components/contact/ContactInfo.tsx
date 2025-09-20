"user client";

import { Mail, Phone, MapPin,} from "lucide-react";
import React from "react"


const ContactInfo: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B0000] text-center md:text-left">
              Get in Touch
            </h2>

            {/* Contact Details */}
            <div className="space-y-4 text-lg">
                <p className="flex items-center gap-3">
                    <Mail className="text-[#4B5320]" /> ekeneonyekachi1@gmail.com
                </p>
                <p className="flex items-center gap-3">
                    <Phone className="text-[#7D7F7D]" /> (+234) 8115-503-343
                </p>
                <p className="flex items-center gap-3">
                    <MapPin className="text-[#8B0000]" /> 8 Iyang Otop Street, Akim, Calabar, Cross River, Nigeria
                </p>
            </div>
        </div>
   );
};

export default ContactInfo;