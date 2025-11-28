import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

const SectorDetails = () => {
  const { sectorName } = useParams();
  const [grants, setGrants] = useState([]);

  // ✅ Same data used in chart (so clicking a slice loads same details)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("grants") || "[]");

    const sampleGrants = [
      // Agriculture
      {
        id: "AGR-001",
        title: "PM Kisan Samman Nidhi",
        field: "Agriculture",
        amount: 60000 * 10000000,
        creator: "Ministry of Agriculture",
        description: "Provides ₹6,000 annual income support to farmers.",
        yearLaunched: "2019",
        status: "Ongoing central sector scheme with installments released directly to farmer bank accounts.",
        beneficiaries: "Over 11 crore farmer families registered (approximate).",
        fundsUtilized: "Over ₹2.8 lakh crore released to beneficiaries as of recent Union Budget (approximate).",
        impact: "Helps small and marginal farmers with predictable income support for input purchases and basic needs.",
        coverage: "National",
        nodalAgency: "Ministry of Agriculture and Farmers Welfare",
        latestUpdate:
          "Recent Union Budget speeches have continued PM-KISAN with a focus on timely DBT transfers to all eligible farmers.",
        sources: ["Ministry of Agriculture and Farmers Welfare", "PIB", "Union Budget documents"],
      },
      {
        id: "AGR-002",
        title: "Soil Health Card Scheme",
        field: "Agriculture",
        amount: 2500 * 10000000,
        creator: "Ministry of Agriculture",
        description: "Ensures better soil productivity through testing and awareness.",
        yearLaunched: "2015",
        status: "Implemented in multiple cycles; states continue issuing and updating soil health cards.",
        beneficiaries: "Over 22 crore soil health cards reportedly issued to farmers (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact: "Improved awareness of soil nutrient status and more balanced fertilizer use in participating districts.",
        coverage: "National",
        nodalAgency: "Ministry of Agriculture and Farmers Welfare",
        latestUpdate:
          "Recent official mentions highlight ongoing support for soil testing labs and card distribution in all states.",
        sources: ["Ministry of Agriculture and Farmers Welfare", "PIB"],
      },
      {
        id: "AGR-003",
        title: "Agriculture Infrastructure Fund",
        field: "Agriculture",
        amount: 33000 * 10000000,
        creator: "Department of Agriculture",
        description: "Funds post-harvest infrastructure projects across India.",
        yearLaunched: "2020",
        status: "Operational with projects sanctioned for warehouses, cold chains and primary processing units.",
        beneficiaries: "Thousands of agri-entrepreneurs, FPOs and cooperatives supported (approximate).",
        fundsUtilized:
          "Sanctions running into tens of thousands of crore; precise utilisation by year not officially consolidated in one figure.",
        impact: "Supports reduction of post-harvest losses and improves market access through new agri-logistics and storage.",
        coverage: "National, demand-driven with focus on rural and semi-urban areas.",
        nodalAgency: "Department of Agriculture, Cooperation & Farmers Welfare",
        latestUpdate:
          "Recent reviews highlight increased interest from FPOs and cooperatives under the concessional credit facility.",
        sources: ["Department of Agriculture, Cooperation & Farmers Welfare", "PIB"],
      },
      {
        id: "AGR-004",
        title: "Pradhan Mantri Fasal Bima Yojana",
        field: "Agriculture",
        amount: 12000 * 10000000,
        creator: "Ministry of Agriculture",
        description: "Crop insurance scheme for farmers across India.",
        yearLaunched: "2016",
        status: "Scheme continues with revised guidelines and increased state participation.",
        beneficiaries: "Over 30 crore farmer applications cumulatively insured across seasons (approximate).",
        fundsUtilized:
          "Premium subsidies and claim payments cumulatively in the tens of thousands of crore; exact figure not given in a single official number.",
        impact: "Provides risk cover against crop loss due to natural calamities, reducing distress and enabling credit access.",
        coverage: "National, implemented by participating states and UTs.",
        nodalAgency: "Ministry of Agriculture and Farmers Welfare",
        latestUpdate:
          "Recent updates mention use of technology like remote sensing and mobile apps for yield estimation and claim processing.",
        sources: ["Ministry of Agriculture and Farmers Welfare", "PIB"],
      },
      {
        id: "AGR-005",
        title: "National Food Security Mission",
        field: "Agriculture",
        amount: 5000 * 10000000,
        creator: "Dept. of Agriculture",
        description: "Enhances production of rice, wheat, pulses, and coarse cereals.",
        yearLaunched: "2007",
        status: "Mission continues with focus on pulses, coarse cereals and commercial crops in selected districts.",
        beneficiaries: "Millions of farmers supported through demonstrations, seed distribution and inputs (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Contributed to higher production of targeted crops and improved productivity through better seeds and practices.",
        coverage: "Selected districts across multiple states, expanded over time.",
        nodalAgency: "Department of Agriculture, Cooperation & Farmers Welfare",
        latestUpdate:
          "Recent schemes and budget notes refer to ongoing support for NFSM components in high-potential districts.",
        sources: ["Department of Agriculture, Cooperation & Farmers Welfare", "PIB"],
      },

      // Education
      {
        id: "EDU-001",
        title: "National Education Mission",
        field: "Education",
        amount: 38965 * 10000000,
        creator: "Ministry of Education",
        description: "Promotes inclusive and equitable quality education.",
        yearLaunched: "2018 (as an integrated mission)",
        status: "Umbrella mission under which major school and adult education schemes continue to operate.",
        beneficiaries: "Crores of children and teachers across government and aided schools (approximate).",
        fundsUtilized:
          "Annual budget allocations in tens of thousands of crore; detailed cumulative utilisation not given in one official figure.",
        impact: "Strengthens school infrastructure, teacher development and learning outcomes through integrated funding.",
        coverage: "National",
        nodalAgency: "Ministry of Education",
        latestUpdate:
          "Recent budgets continue allocations under the National Education Mission aligning with National Education Policy priorities.",
        sources: ["Ministry of Education", "Union Budget documents", "PIB"],
      },
      {
        id: "EDU-002",
        title: "PM eVIDYA",
        field: "Education",
        amount: 1800 * 10000000,
        creator: "Ministry of Education",
        description: "Digital education initiative to promote e-learning.",
        yearLaunched: "2020",
        status: "Ongoing initiative providing multi-mode digital education (DIKSHA, TV channels, radio, podcasts).",
        beneficiaries: "Students and teachers across all states accessing digital and broadcast content (crores of learners, approximate).",
        fundsUtilized: "Data not officially disclosed in a single consolidated figure.",
        impact: "Helped maintain learning continuity during and after COVID-19 through digital, TV and radio-based content.",
        coverage: "National",
        nodalAgency: "Ministry of Education",
        latestUpdate:
          "Recent official notes highlight expansion of e-content on DIKSHA and continued use of dedicated Swayam Prabha TV channels.",
        sources: ["Ministry of Education", "PIB"],
      },
      {
        id: "EDU-003",
        title: "Samagra Shiksha",
        field: "Education",
        amount: 37383 * 10000000,
        creator: "Ministry of Education",
        description: "School education program integrating SSA, RMSA, and TE.",
        yearLaunched: "2018",
        status: "Primary school-education scheme under the National Education Mission; currently in an extended phase.",
        beneficiaries:
          "All children from pre-school to class 12 in government and aided schools (crores of students, approximate).",
        fundsUtilized:
          "Large part of school-education budget each year; exact cumulative utilisation not published as a single number.",
        impact:
          "Improved access, infrastructure, inclusive education and learning outcomes through integrated funding and reforms.",
        coverage: "National, implemented by states/UTs with central support.",
        nodalAgency: "Department of School Education & Literacy, Ministry of Education",
        latestUpdate:
          "Recent approvals include continued support for Samagra Shiksha with emphasis on foundational learning and teacher training.",
        sources: ["Ministry of Education", "Samagra Shiksha portal", "PIB"],
      },
      {
        id: "EDU-004",
        title: "National Means-cum-Merit Scholarship",
        field: "Education",
        amount: 750 * 10000000,
        creator: "Ministry of HRD",
        description: "Scholarship scheme for meritorious students from weaker sections.",
        yearLaunched: "2008",
        status: "Scholarships awarded annually to eligible Class VIII students who continue up to Class XII.",
        beneficiaries: "Around 1 lakh scholarships sanctioned per year (approximate).",
        fundsUtilized: "Data not officially disclosed in a consolidated form.",
        impact:
          "Reduces drop-out at secondary stage by providing financial incentive to meritorious students from low-income families.",
        coverage: "National, implemented through state education departments.",
        nodalAgency: "Department of School Education & Literacy, Ministry of Education",
        latestUpdate: "Recent circulars update scholarship rates and renewal conditions in line with current costs.",
        sources: ["Ministry of Education", "PIB"],
      },
      {
        id: "EDU-005",
        title: "IndiaAI FutureSkills Initiative",
        field: "Education",
        amount: 500 * 10000000,
        creator: "Ministry of Electronics and IT",
        description: "Trains 1M teachers in AI across India.",
        yearLaunched: "Data not officially disclosed",
        status:
          "Announced as part of IndiaAI and emerging tech skilling efforts; implementation progressing in collaboration with states and partners.",
        beneficiaries:
          "Teachers and learners participating in AI and emerging-tech skilling programmes; numbers expanding each year.",
        fundsUtilized: "Data not officially disclosed",
        impact: "Aims to build foundational AI literacy and advanced skills for educators and students.",
        coverage: "National, with pilots and programmes in multiple states.",
        nodalAgency: "Ministry of Electronics and Information Technology (MeitY)",
        latestUpdate:
          "Recent announcements highlight IndiaAI and FutureSkills programmes as key parts of the digital-skills agenda.",
        sources: ["MeitY", "IndiaAI announcements", "PIB"],
      },

      // Health
      {
        id: "HLT-001",
        title: "Ayushman Bharat (PM-JAY)",
        field: "Health",
        amount: 64000 * 10000000,
        creator: "Ministry of Health",
        description: "Provides health coverage up to ₹5 lakh per family per year.",
        yearLaunched: "2018",
        status: "Ongoing national health protection scheme with empanelled hospitals across India.",
        beneficiaries: "Over 5 crore hospital admissions authorised for beneficiary families (approximate).",
        fundsUtilized:
          "Cumulative claim payouts in tens of thousands of crore; exact up-to-date total not given in a single figure.",
        impact:
          "Expanded access to secondary and tertiary care for vulnerable households while reducing out-of-pocket expenditure.",
        coverage: "National, based on SECC-identified families and state-specific expansions.",
        nodalAgency: "National Health Authority, Ministry of Health and Family Welfare",
        latestUpdate:
          "Recent updates mention expansion of empanelled hospitals and integration with digital health records.",
        sources: ["National Health Authority", "Ministry of Health and Family Welfare", "PIB"],
      },
      {
        id: "HLT-002",
        title: "National Health Mission",
        field: "Health",
        amount: 37000 * 10000000,
        creator: "Ministry of Health",
        description: "Improves health systems and outcomes across India.",
        yearLaunched: "2013 (as NHM combining NRHM and NUHM)",
        status: "Mission continues as the main umbrella for strengthening public health systems.",
        beneficiaries:
          "Covers entire population using public health facilities, with focus on mothers, children and vulnerable groups.",
        fundsUtilized:
          "Annual expenditure in tens of thousands of crore; consolidated cumulative utilisation not published as one number.",
        impact:
          "Contributed to reductions in maternal and infant mortality and expansion of health infrastructure and human resources.",
        coverage: "National, through state and district health societies.",
        nodalAgency: "Ministry of Health and Family Welfare",
        latestUpdate:
          "Recent programme implementation plans approved for states under NHM for the current financial year.",
        sources: ["Ministry of Health and Family Welfare", "NHM portal", "PIB"],
      },
      {
        id: "HLT-003",
        title: "PM Ayushman Bharat Digital Mission",
        field: "Health",
        amount: 1400 * 10000000,
        creator: "Ministry of Health",
        description: "Creates a digital health ecosystem for all citizens.",
        yearLaunched: "2021",
        status: "Roll-out of Ayushman Bharat Health Accounts (ABHA) and digital health registries is underway.",
        beneficiaries: "Crores of ABHA IDs generated for citizens (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact: "Lays the foundation for interoperable digital health records and more efficient service delivery.",
        coverage: "National, with phased adoption across states and health facilities.",
        nodalAgency: "National Health Authority, Ministry of Health and Family Welfare",
        latestUpdate:
          "Recent updates highlight growth in ABHA registrations and onboarding of hospitals and labs onto the digital ecosystem.",
        sources: ["National Health Authority", "PIB"],
      },
      {
        id: "HLT-004",
        title: "Janani Suraksha Yojana",
        field: "Health",
        amount: 3000 * 10000000,
        creator: "Ministry of Health",
        description: "Promotes institutional deliveries to reduce maternal mortality.",
        yearLaunched: "2005",
        status: "Continues as a key safe-motherhood intervention under NHM.",
        beneficiaries: "Crores of pregnant women have received benefits for institutional deliveries (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Helped increase institutional delivery rates and contributed to reduced maternal and neonatal mortality.",
        coverage: "National, with special focus on low-performing states.",
        nodalAgency: "Ministry of Health and Family Welfare",
        latestUpdate:
          "Recent NHM documents reiterate JSY as part of the reproductive and child health package.",
        sources: ["Ministry of Health and Family Welfare", "NHM reports"],
      },
      {
        id: "HLT-005",
        title: "Mission Indradhanush",
        field: "Health",
        amount: 800 * 10000000,
        creator: "Ministry of Health",
        description: "Universal immunization of children under two years of age.",
        yearLaunched: "2014",
        status: "Routine and intensified rounds continue to reach partially immunised and left-out children.",
        beneficiaries: "Crores of children and pregnant women covered under multiple rounds (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact: "Improved full-immunisation coverage in targeted districts and urban areas.",
        coverage: "National, with focus on low-coverage districts.",
        nodalAgency: "Ministry of Health and Family Welfare",
        latestUpdate:
          "Recent phases like Intensified Mission Indradhanush have been launched to accelerate coverage.",
        sources: ["Ministry of Health and Family Welfare", "PIB"],
      },

      // Infrastructure
      {
        id: "INF-001",
        title: "Smart Cities Mission",
        field: "Infrastructure",
        amount: 48000 * 10000000,
        creator: "Ministry of Housing and Urban Affairs",
        description: "Develops 100 smart cities with modern infrastructure.",
        yearLaunched: "2015",
        status: "Most projects are either completed or in advanced stages across the selected cities.",
        beneficiaries: "Residents of 100 selected cities (tens of millions of urban citizens, approximate).",
        fundsUtilized:
          "Central assistance of up to ₹500 crore per city has largely been released; detailed utilisation varies by city.",
        impact:
          "Enhanced urban services, public spaces and digital governance through area-based and pan-city projects.",
        coverage: "Selected urban local bodies across India.",
        nodalAgency: "Ministry of Housing and Urban Affairs with city-level SPVs",
        latestUpdate:
          "Recent reviews highlight completion of a majority of smart-city projects and a focus on operations and maintenance.",
        sources: ["Ministry of Housing and Urban Affairs", "Smart Cities Mission documents", "PIB"],
      },
      {
        id: "INF-002",
        title: "Bharatmala Pariyojana",
        field: "Infrastructure",
        amount: 531000 * 10000000,
        creator: "Ministry of Road Transport",
        description: "Improves road connectivity and logistics efficiency.",
        yearLaunched: "2017",
        status: "Phase-I highway packages are under construction or completed across multiple corridors.",
        beneficiaries: "Nationwide freight and passenger traffic using national highways.",
        fundsUtilized:
          "Large share of the approved outlay has been committed for projects; exact up-to-date utilisation not disclosed as a single figure.",
        impact:
          "Improves connectivity between economic centres, border areas and ports, reducing travel time and logistics costs.",
        coverage: "National highway network across many states.",
        nodalAgency: "Ministry of Road Transport and Highways, NHAI and related agencies",
        latestUpdate:
          "Recent ministry updates refer to progress in kilometre length awarded and completed under Bharatmala.",
        sources: ["Ministry of Road Transport and Highways", "NHAI", "PIB"],
      },
      {
        id: "INF-003",
        title: "PM Gati Shakti",
        field: "Infrastructure",
        amount: 20000 * 10000000,
        creator: "NITI Aayog",
        description: "National master plan for multi-modal connectivity.",
        yearLaunched: "2021",
        status:
          "Digital platform and institutional framework are operational; ministries use it for integrated planning of infrastructure projects.",
        beneficiaries: "Citizens and businesses benefiting from smoother logistics and connectivity (nationwide, indirect).",
        fundsUtilized:
          "Data not officially disclosed (platform mainly guides and coordinates investments across schemes).",
        impact:
          "Improves coordination across transport, logistics and utility projects to reduce delays and cost overruns.",
        coverage: "National, spanning multiple infrastructure ministries and states.",
        nodalAgency: "Cabinet Secretariat / Ministry of Commerce and Industry in coordination with infrastructure ministries",
        latestUpdate:
          "Recent references highlight onboarding of more ministries and states onto the PM Gati Shakti platform.",
        sources: ["Government of India press releases", "PIB"],
      },
      {
        id: "INF-004",
        title: "AMRUT 2.0",
        field: "Infrastructure",
        amount: 27600 * 10000000,
        creator: "Ministry of Urban Affairs",
        description: "Focuses on water supply and sewage systems.",
        yearLaunched: "2021",
        status:
          "Implementation ongoing with approved projects for universal water tap connections and sewerage in cities.",
        beneficiaries: "Urban households in participating cities (millions of residents, approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Aims to provide access to functional household tap connections and improved wastewater management.",
        coverage: "Urban local bodies across multiple states and UTs.",
        nodalAgency: "Ministry of Housing and Urban Affairs",
        latestUpdate:
          "Recent statements highlight progress in project approvals and city-level implementation under AMRUT 2.0.",
        sources: ["Ministry of Housing and Urban Affairs", "PIB"],
      },
      {
        id: "INF-005",
        title: "Pradhan Mantri Awas Yojana (Urban)",
        field: "Infrastructure",
        amount: 80000 * 10000000,
        creator: "Ministry of Housing",
        description: "Affordable housing for all urban citizens by 2025.",
        yearLaunched: "2015",
        status:
          "Most sanctioned houses are in various stages from sanction to completion; mission period extended for completion.",
        beneficiaries: "Over one crore sanctioned houses for urban poor and middle-income groups (approximate).",
        fundsUtilized:
          "Central assistance of over ₹1 lakh crore sanctioned; exact utilised amount varies by state.",
        impact:
          "Supports home ownership and improved living conditions for low-income urban households.",
        coverage: "Urban areas across all states and UTs.",
        nodalAgency: "Ministry of Housing and Urban Affairs",
        latestUpdate:
          "Recent reviews focus on completion of remaining houses and convergence with other urban missions.",
        sources: ["Ministry of Housing and Urban Affairs", "PIB"],
      },

      // Environment
      {
        id: "ENV-001",
        title: "National Clean Air Programme",
        field: "Environment",
        amount: 472 * 10000000,
        creator: "Ministry of Environment",
        description: "Aims to reduce air pollution by 20–30% in cities by 2025.",
        yearLaunched: "2019",
        status: "Action plans notified for non-attainment cities; monitoring and mitigation projects are underway.",
        beneficiaries: "Residents of hundreds of cities identified with high particulate pollution.",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Supports city-level interventions like monitoring, dust control and waste management to improve air quality.",
        coverage: "Urban centres identified as non-attainment cities across multiple states.",
        nodalAgency: "Ministry of Environment, Forest and Climate Change (MoEFCC)",
        latestUpdate:
          "Recent updates mention revised targets and additional funding support to urban local bodies.",
        sources: ["MoEFCC", "PIB"],
      },
      {
        id: "ENV-002",
        title: "Green India Mission",
        field: "Environment",
        amount: 3000 * 10000000,
        creator: "Ministry of Environment",
        description: "Increases forest cover and ecosystem restoration.",
        yearLaunched: "2014",
        status:
          "Implementation progressing through state forest departments and community-based projects.",
        beneficiaries: "Forest-dependent communities and ecosystems in targeted landscapes.",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Aims to enhance forest and tree cover, improve ecosystem services and support climate-change mitigation.",
        coverage: "Selected landscapes across multiple states.",
        nodalAgency: "MoEFCC",
        latestUpdate:
          "Recent communications reiterate Green India Mission as one of the eight National Missions on Climate Change.",
        sources: ["MoEFCC", "PIB"],
      },
      {
        id: "ENV-003",
        title: "Namami Gange",
        field: "Environment",
        amount: 20000 * 10000000,
        creator: "Ministry of Jal Shakti",
        description: "Clean and rejuvenate River Ganga and its tributaries.",
        yearLaunched: "2014",
        status: "Sewage-treatment, river-front and biodiversity projects are in various stages of completion.",
        beneficiaries: "Communities along the Ganga basin and broader ecological systems.",
        fundsUtilized:
          "Significant portion of approved outlay contracted; exact cumulative utilisation not in a single public figure.",
        impact:
          "Improved sewage treatment capacity and river-front development in many towns along the Ganga.",
        coverage: "Ganga basin states and key tributaries.",
        nodalAgency: "National Mission for Clean Ganga, Ministry of Jal Shakti",
        latestUpdate:
          "Recent reviews highlight commissioned STPs and extended focus on tributaries and wetlands.",
        sources: ["National Mission for Clean Ganga", "PIB"],
      },
      {
        id: "ENV-004",
        title: "Swachh Bharat Mission",
        field: "Environment",
        amount: 14100 * 10000000,
        creator: "Ministry of Urban Affairs",
        description: "Promotes cleanliness and waste management.",
        yearLaunched: "2014 (urban) / 2014 (rural)",
        status:
          "Swachh Bharat Mission 2.0 focuses on solid and liquid waste management after ODF achievement.",
        beneficiaries: "Households and urban/rural local bodies across India.",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Massive increase in toilet coverage and behavioural change campaigns; ongoing focus on waste management.",
        coverage: "National, rural and urban components.",
        nodalAgency: "Ministry of Housing and Urban Affairs; Department of Drinking Water and Sanitation",
        latestUpdate:
          "Recent reports highlight progress under SBM-U 2.0 and SBM-G Phase II on waste processing and plastic waste reduction.",
        sources: ["Ministry of Housing and Urban Affairs", "Department of Drinking Water and Sanitation", "PIB"],
      },
      {
        id: "ENV-005",
        title: "National Mission on Himalayan Studies",
        field: "Environment",
        amount: 500 * 10000000,
        creator: "MoEFCC",
        description: "Supports research on Himalayan ecosystem and communities.",
        yearLaunched: "2014",
        status:
          "Grants supported for research institutions and NGOs working in the Himalayan region.",
        beneficiaries: "Researchers, local communities and ecosystems in Himalayan states.",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Generates knowledge on climate, biodiversity and socio-economic issues in the Himalayas to inform policy.",
        coverage: "Himalayan states and union territories.",
        nodalAgency: "MoEFCC",
        latestUpdate:
          "Recent references note ongoing project funding cycles and integration with climate and biodiversity priorities.",
        sources: ["MoEFCC", "PIB"],
      },

      // Technology
      {
        id: "TEC-001",
        title: "Digital India Programme",
        field: "Technology",
        amount: 25000 * 10000000,
        creator: "Ministry of Electronics and IT",
        description: "Transforms India into a digitally empowered society.",
        yearLaunched: "2015",
        status:
          "Flagship umbrella programme with multiple ongoing initiatives across connectivity, e-governance and digital services.",
        beneficiaries: "Citizens and businesses using digital public infrastructure and online services nationwide.",
        fundsUtilized: "Data not officially disclosed in one consolidated number.",
        impact:
          "Expanded broadband connectivity, digital identity, and online service delivery through platforms like Aadhaar, UPI and DigiLocker.",
        coverage: "National",
        nodalAgency: "Ministry of Electronics and Information Technology (MeitY)",
        latestUpdate:
          "Recent announcements emphasise Digital India as the backbone for emerging DPI layers and innovation.",
        sources: ["MeitY", "PIB"],
      },
      {
        id: "TEC-002",
        title: "Startup India Seed Fund",
        field: "Technology",
        amount: 945 * 10000000,
        creator: "DPIIT",
        description: "Provides capital support to early-stage startups.",
        yearLaunched: "2021",
        status:
          "Fund of funds routed through selected incubators which then support eligible startups.",
        beneficiaries: "Hundreds of early-stage startups supported via incubators (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Bridges seed and market-entry funding gap for technology-driven and innovative startups.",
        coverage: "National, through recognised incubators.",
        nodalAgency: "Department for Promotion of Industry and Internal Trade (DPIIT)",
        latestUpdate:
          "Recent official notes highlight continued sanctioning of grants to incubators and startups under the scheme.",
        sources: ["DPIIT", "Startup India", "PIB"],
      },
      {
        id: "TEC-003",
        title: "National AI Mission",
        field: "Technology",
        amount: 10000 * 10000000,
        creator: "NITI Aayog",
        description: "Promotes research and deployment of AI applications.",
        yearLaunched: "Data not officially disclosed",
        status:
          "Policy-level mission with pilot projects and centres of excellence in priority sectors.",
        beneficiaries:
          "Researchers, startups and sectors adopting AI solutions in pilot and scale-up projects.",
        fundsUtilized: "Data not officially disclosed",
        impact: "Supports experimentation with AI in health, agriculture, education and governance.",
        coverage: "National, with focused pilots in selected states and sectors.",
        nodalAgency: "NITI Aayog / MeitY (as per evolving institutional arrangements)",
        latestUpdate:
          "Recent references are often clubbed under the broader IndiaAI initiative and AI-related budget announcements.",
        sources: ["NITI Aayog", "MeitY", "PIB"],
      },
      {
        id: "TEC-004",
        title: "MeitY FutureSkills PRIME",
        field: "Technology",
        amount: 400 * 10000000,
        creator: "Ministry of IT",
        description: "Online skilling platform for emerging tech roles.",
        yearLaunched: "2019",
        status: "Platform operational with courses in multiple emerging technologies.",
        beneficiaries: "Lakh-plus learners enrolled for digital and emerging-tech courses (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Builds industry-relevant skills in areas like cloud, AI, cybersecurity and data analytics.",
        coverage: "National, online delivery.",
        nodalAgency: "Ministry of Electronics and Information Technology (MeitY)",
        latestUpdate:
          "Recent mentions highlight new courses and partnerships under the FutureSkills PRIME programme.",
        sources: ["MeitY", "NASSCOM FutureSkills", "PIB"],
      },
      {
        id: "TEC-005",
        title: "Atal Innovation Mission",
        field: "Technology",
        amount: 700 * 10000000,
        creator: "NITI Aayog",
        description: "Encourages innovation and entrepreneurship across schools and MSMEs.",
        yearLaunched: "2016",
        status:
          "Multiple components active, including Atal Tinkering Labs, Atal Incubation Centres and challenge programmes.",
        beneficiaries:
          "Thousands of schools with tinkering labs and numerous incubators, startups and innovators (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Nurtures a culture of innovation and problem-solving among students, startups and MSMEs.",
        coverage: "National, with presence in urban and rural areas.",
        nodalAgency: "NITI Aayog",
        latestUpdate:
          "Recent updates mention expansion of tinkering labs and new innovation challenges under the mission.",
        sources: ["NITI Aayog", "Atal Innovation Mission", "PIB"],
      },

      // Women & Child
      {
        id: "WOM-001",
        title: "Beti Bachao Beti Padhao",
        field: "Women & Child",
        amount: 1500 * 10000000,
        creator: "Ministry of WCD",
        description: "Promotes gender equality and girl child education.",
        yearLaunched: "2015",
        status:
          "Ongoing with focus on improving sex ratio at birth and girls’ education indicators.",
        beneficiaries:
          "Campaign and programme components cover districts with skewed sex ratio and schools nationwide.",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Helped increase awareness on gender bias and supported improved girl-child enrolment in education.",
        coverage: "National, with focused districts in initial phases.",
        nodalAgency:
          "Ministry of Women and Child Development in convergence with Health and Education ministries",
        latestUpdate:
          "Recent communications emphasise revised guidelines to focus more on measurable education outcomes.",
        sources: ["Ministry of Women and Child Development", "PIB"],
      },
      {
        id: "WOM-002",
        title: "Pradhan Mantri Matru Vandana Yojana",
        field: "Women & Child",
        amount: 1200 * 10000000,
        creator: "Ministry of WCD",
        description: "Provides financial assistance to pregnant women.",
        yearLaunched: "2017",
        status: "Cash benefits continue to be provided to eligible pregnant and lactating mothers.",
        beneficiaries: "Several crore women have received at least one instalment since inception (approximate).",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Supports wage compensation and promotes health-seeking behaviour during pregnancy and after childbirth.",
        coverage: "National (excluding some categories as per scheme guidelines).",
        nodalAgency: "Ministry of Women and Child Development",
        latestUpdate:
          "Recent scheme documents discuss integration under the broader Mission Shakti framework.",
        sources: ["Ministry of Women and Child Development", "PIB"],
      },
      {
        id: "WOM-003",
        title: "Poshan Abhiyaan",
        field: "Women & Child",
        amount: 9000 * 10000000,
        creator: "Ministry of WCD",
        description: "Improves nutritional outcomes for children and women.",
        yearLaunched: "2018",
        status:
          "Continues as a flagship nutrition mission with convergence across multiple departments.",
        beneficiaries:
          "Children under 6 years, adolescent girls, pregnant and lactating women across anganwadi centres.",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Drives behaviour-change campaigns and technology-enabled monitoring to reduce malnutrition.",
        coverage: "National, through ICDS/Anganwadi network.",
        nodalAgency: "Ministry of Women and Child Development",
        latestUpdate:
          "Recent updates refer to POSHAN 2.0 with restructured nutrition schemes under Mission Poshan.",
        sources: ["Ministry of Women and Child Development", "PIB"],
      },
      {
        id: "WOM-004",
        title: "One Stop Centre Scheme",
        field: "Women & Child",
        amount: 700 * 10000000,
        creator: "Ministry of WCD",
        description: "Support for women affected by violence.",
        yearLaunched: "2015",
        status:
          "Centres operational in many districts providing integrated support services.",
        beneficiaries: "Women and girls seeking assistance for violence, abuse or distress.",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Provides integrated legal, medical, counselling and shelter support under one roof.",
        coverage: "District and sub-district locations across states and UTs.",
        nodalAgency:
          "Ministry of Women and Child Development in coordination with state departments",
        latestUpdate:
          "Recent reports mention expansion of One Stop Centres to all districts and some foreign missions.",
        sources: ["Ministry of Women and Child Development", "PIB"],
      },
      {
        id: "WOM-005",
        title: "Mission Shakti",
        field: "Women & Child",
        amount: 3000 * 10000000,
        creator: "Ministry of WCD",
        description: "Umbrella scheme for safety and empowerment of women.",
        yearLaunched: "2021",
        status:
          "Roll-out of sub-schemes for protection, shelter and empowerment is in progress across states.",
        beneficiaries:
          "Women and girls accessing protection services, shelter homes and empowerment programmes.",
        fundsUtilized: "Data not officially disclosed",
        impact:
          "Consolidates multiple women-centric schemes to provide integrated safety and empowerment interventions.",
        coverage: "National",
        nodalAgency: "Ministry of Women and Child Development",
        latestUpdate:
          "Recent guidelines and budget notes describe Mission Shakti components and allocation to states.",
        sources: ["Ministry of Women and Child Development", "PIB"],
      },
    ];

    // Merge existing localStorage grants with enriched sample data by id
    const merged = [...sampleGrants];
    stored.forEach((g) => {
      const idx = merged.findIndex((s) => s.id === g.id);
      if (idx === -1) {
        merged.push(g);
      } else {
        // Stored grants override or extend defaults without losing enriched metadata
        merged[idx] = { ...merged[idx], ...g };
      }
    });

    // Persist merged dataset so other pages (like PublicView) can read the full records
    localStorage.setItem("grants", JSON.stringify(merged));

    setGrants(merged);
  }, []);

  const filtered = grants.filter((g) => g.field === sectorName);
  const totalAllocation = filtered.reduce((sum, g) => sum + (g.amount || 0), 0);

  return (
    <div className="sector-details-page reveal">
      <div className="sector-details-container">
        <div className="sector-details-header glassy">
          <div className="sector-details-icon">📊</div>
          <h1 className="gradient sector-details-title">{sectorName} Grants</h1>
          <p className="muted sector-details-subtitle">
            Explore all grants in the {sectorName} sector with full transparency.
          </p>
          
          <div className="sector-details-stats">
            <div className="sector-stat">
              <div className="sector-stat-value">{filtered.length}</div>
              <div className="sector-stat-label">Total Grants</div>
            </div>
            <div className="sector-stat">
              <div className="sector-stat-value">₹{(totalAllocation / 10000000).toFixed(1)}Cr</div>
              <div className="sector-stat-label">Total Allocation</div>
            </div>
          </div>
        </div>

        {filtered.length ? (
          <div className="sector-grants-grid">
            {filtered.map((g) => (
              <Link 
                key={g.id} 
                to={`/view/${g.id}`}
                className="sector-grant-card glassy"
              >
                <div className="sector-grant-header">
                  <h3 className="gradient sector-grant-title">{g.title}</h3>
                  <div className="sector-grant-badge">{g.field}</div>
                </div>
                <div className="sector-grant-body">
                  <div className="sector-grant-info">
                    <div className="sector-grant-info-item">
                      <span className="sector-grant-info-label">Grant ID:</span>
                      <span className="sector-grant-info-value">{g.id}</span>
                    </div>
                    <div className="sector-grant-info-item">
                      <span className="sector-grant-info-label">Amount:</span>
                      <span className="sector-grant-info-value">₹{g.amount?.toLocaleString() || '0'}</span>
                    </div>
                    {g.creator && (
                      <div className="sector-grant-info-item">
                        <span className="sector-grant-info-label">Implementing Body:</span>
                        <span className="sector-grant-info-value">{g.creator}</span>
                      </div>
                    )}
                  </div>
                  {g.description && (
                    <p className="muted sector-grant-description">{g.description}</p>
                  )}
                </div>
                <div className="sector-grant-footer">
                  <span className="sector-grant-link">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="sector-no-grants glassy">
            <div className="sector-no-grants-icon">📭</div>
            <p className="muted sector-no-grants-text">No grants found for this sector.</p>
            <Link to="/chart" className="btn-primary sector-back-btn">
              Back to Dashboard
            </Link>
          </div>
        )}

        <div className="sector-details-footer">
          <Link to="/chart" className="login-footer-link">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default SectorDetails;
