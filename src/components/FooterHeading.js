import React from "react";
import "../styles/FooterHeading.css";

function FooterHeading({ forecastData, selectedDayIndex }) {
  if (!forecastData || !forecastData.forecast) {
    return null;
  }

  const timezoneMap = {
    // Africa
    "Africa/Abidjan": "GMT",
    "Africa/Accra": "GMT",
    "Africa/Addis_Ababa": "EAT (GMT+3)",
    "Africa/Algiers": "CET (GMT+1)",
    "Africa/Cairo": "EET (GMT+2)",
    "Africa/Casablanca": "WEST (GMT+1)",
    "Africa/Dar_es_Salaam": "EAT (GMT+3)",
    "Africa/Djibouti": "EAT (GMT+3)",
    "Africa/Johannesburg": "SAST (GMT+2)",
    "Africa/Kampala": "EAT (GMT+3)",
    "Africa/Khartoum": "CAT (GMT+2)",
    "Africa/Lagos": "WAT (GMT+1)",
    "Africa/Mogadishu": "EAT (GMT+3)",
    "Africa/Nairobi": "EAT (GMT+3)",
    "Africa/Tripoli": "EET (GMT+2)",
    "Africa/Tunis": "CET (GMT+1)",

    // Americas
    "America/Anchorage": "AKDT (GMT-8)",
    "America/Bogota": "COT (GMT-5)",
    "America/Buenos_Aires": "ART (GMT-3)",
    "America/Caracas": "VET (GMT-4)",
    "America/Chicago": "CDT (GMT-5)",
    "America/Denver": "MDT (GMT-6)",
    "America/Halifax": "ADT (GMT-3)",
    "America/Havana": "CDT (GMT-4)",
    "America/Lima": "PET (GMT-5)",
    "America/Los_Angeles": "PDT (GMT-7)",
    "America/Mexico_City": "CDT (GMT-5)",
    "America/New_York": "EDT (GMT-4)",
    "America/Phoenix": "MST (GMT-7)",
    "America/Santiago": "CLT (GMT-4)",
    "America/Sao_Paulo": "BRT (GMT-3)",
    "America/St_Johns": "NDT (GMT-2:30)",
    "America/Toronto": "EDT (GMT-4)",
    "America/Vancouver": "PDT (GMT-7)",

    // Asia
    "Asia/Baghdad": "AST (GMT+3)",
    "Asia/Bangkok": "ICT (GMT+7)",
    "Asia/Beirut": "EEST (GMT+3)",
    "Asia/Dhaka": "BST (GMT+6)",
    "Asia/Dubai": "GST (GMT+4)",
    "Asia/Hong_Kong": "HKT (GMT+8)",
    "Asia/Ho_Chi_Minh": "ICT (GMT+7)",
    "Asia/Istanbul": "TRT (GMT+3)",
    "Asia/Jakarta": "WIB (GMT+7)",
    "Asia/Jerusalem": "IDT (GMT+3)",
    "Asia/Kabul": "AFT (GMT+4:30)",
    "Asia/Karachi": "PKT (GMT+5)",
    "Asia/Kathmandu": "NPT (GMT+5:45)",
    "Asia/Kolkata": "IST (GMT+5:30)",
    "Asia/Kuala_Lumpur": "MYT (GMT+8)",
    "Asia/Manila": "PHT (GMT+8)",
    "Asia/Muscat": "GST (GMT+4)",
    "Asia/Qatar": "AST (GMT+3)",
    "Asia/Riyadh": "AST (GMT+3)",
    "Asia/Seoul": "KST (GMT+9)",
    "Asia/Shanghai": "CST (GMT+8)",
    "Asia/Singapore": "SGT (GMT+8)",
    "Asia/Taipei": "CST (GMT+8)",
    "Asia/Tehran": "IRST (GMT+3:30)",
    "Asia/Tokyo": "JST (GMT+9)",
    "Asia/Yangon": "MMT (GMT+6:30)",

    // Australia and Pacific
    "Australia/Adelaide": "ACDT (GMT+10:30)",
    "Australia/Brisbane": "AEST (GMT+10)",
    "Australia/Darwin": "ACST (GMT+9:30)",
    "Australia/Melbourne": "AEST (GMT+10)",
    "Australia/Perth": "AWST (GMT+8)",
    "Australia/Sydney": "AEST (GMT+10)",
    "Pacific/Auckland": "NZDT (GMT+13)",
    "Pacific/Fiji": "FJT (GMT+12)",
    "Pacific/Guam": "ChST (GMT+10)",
    "Pacific/Honolulu": "HST (GMT-10)",
    "Pacific/Noumea": "NCT (GMT+11)",
    "Pacific/Tahiti": "TAHT (GMT-10)",

    // Europe
    "Europe/Amsterdam": "CEST (GMT+2)",
    "Europe/Athens": "EEST (GMT+3)",
    "Europe/Belgrade": "CEST (GMT+2)",
    "Europe/Berlin": "CEST (GMT+2)",
    "Europe/Brussels": "CEST (GMT+2)",
    "Europe/Bucharest": "EEST (GMT+3)",
    "Europe/Budapest": "CEST (GMT+2)",
    "Europe/Copenhagen": "CEST (GMT+2)",
    "Europe/Dublin": "IST (GMT+1)",
    "Europe/Helsinki": "EEST (GMT+3)",
    "Europe/Kiev": "EEST (GMT+3)",
    "Europe/Lisbon": "WEST (GMT+1)",
    "Europe/London": "BST (GMT+1)",
    "Europe/Madrid": "CEST (GMT+2)",
    "Europe/Moscow": "MSK (GMT+3)",
    "Europe/Oslo": "CEST (GMT+2)",
    "Europe/Paris": "CEST (GMT+2)",
    "Europe/Prague": "CEST (GMT+2)",
    "Europe/Rome": "CEST (GMT+2)",
    "Europe/Stockholm": "CEST (GMT+2)",
    "Europe/Vienna": "CEST (GMT+2)",
    "Europe/Warsaw": "CEST (GMT+2)",
    "Europe/Zurich": "CEST (GMT+2)",
  };

  let location = forecastData.location;

  let timezone = location.tz_id;

  const getTimezoneDisplay = () => {
    if (timezone && timezoneMap[timezone]) {
      return timezoneMap[timezone];
    } else {
      // Fallback for timezones not in our map
      const offset = location.timezone / 3600; // Convert seconds to hours
      const sign = offset >= 0 ? "+" : "";
      return `GMT${sign}${offset}`;
    }
  };

  // Then use it in your component
  return (
    <div className="footer-heading-container">
      <div className="footer-heading">
        <p className="footer-heading-text-col">
          Weathersasa in association with{" "}
          <a className="dtn" href="https://www.dtn.com/">
            DTN
          </a>
        </p>
        <p className="footer-heading-text">
          All times are {getTimezoneDisplay()} unless otherwise stated.
        </p>
      </div>
    </div>
  );
}

export default FooterHeading;
