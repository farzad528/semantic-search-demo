# Azure Cognitive Search - Semantic Search Demo for CSAs
**DISCLAIMER: This app is not for production use and is strictly for internal GBBs and CSAs who want to demo to customers the value that Semantic Search can bring to customers.**

This sample app is for CSA's that want to test out Semantic Search capabilities with their customers index. This app has side-by-side comaparitive functionality that allows you to see Azure Cognitive Search BM25 vs Semantic Search results.
## Prerequisites
- A GitHub account
- [Node.js and Git](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/?WT.mc_id=shopathome-github-jopapa) installed
- An [Azure Cognitive Search Service](https://ms.portal.azure.com/#view/Microsoft_Azure_Marketplace/GalleryItemDetailsBladeNopdl/product~/%7B%22displayName%22%3A%22Azure%20Cognitive%20Search%22%2C%22itemDisplayName%22%3A%22Azure%20Cognitive%20Search%22%2C%22id%22%3A%22Microsoft.Search%22%2C%22bigId%22%3A%22Microsoft.Search%22%2C%22offerId%22%3A%22Search%22%2C%22publisherId%22%3A%22Microsoft%22%2C%22publisherDisplayName%22%3A%22Microsoft%22%2C%22summary%22%3A%22AI-powered%20cloud%20search%20service%20for%20mobile%20and%20web%20app%20development%20(formerly%20Azure%20Search)%22%2C%22longSummary%22%3A%22AI-powered%20cloud%20search%20service%20for%20mobile%20and%20web%20app%20development%20(formerly%20Azure%20Search)%22%2C%22description%22%3A%22%3Cp%3EAI-powered%20cloud%20search%20service%20for%20mobile%20and%20web%20app%20development%3C%2Fp%3E%3Cp%3EAzure%20Cognitive%20Search%20(formerly%20Azure%20Search)%20is%20the%20only%20cloud%20search%20service%20with%20built-in%20artificial%20intelligence%20(AI)%20capabilities%20that%20enrich%20all%20types%20of%20information%20to%20easily%20identify%20and%20explore%20relevant%20content%20at%20scale.%20It%20uses%20the%20same%20integrated%20Microsoft%20natural%20language%20stack%20that%20Bing%20and%20Office%20have%20used%20for%20more%20than%20a%20decade%2C%20and%20prebuilt%20AI%20APIs%20across%20vision%2C%20language%2C%20and%20speech.%3C%2Fp%3E%3Cp%3EAzure%20Cognitive%20Search%20Features%3A%20%3Cul%3E%3Cli%3EFully%20managed%20search%20as%20a%20service%20to%20reduce%20complexity%20and%20scale%20easily%3C%2Fli%3E%3Cli%3EAuto-complete%2C%20geospatial%20search%2C%20filtering%2C%20and%20faceting%20capabilities%20for%20a%20rich%20user%20experience%3C%2Fli%3E%3Cli%3EBuilt-in%20AI%20capabilities%20including%20OCR%2C%20key%20phrase%20extraction%2C%20and%20named%20entity%20recognition%20to%20unlock%20insights%3C%2Fli%3E%3Cli%3EFlexible%20integration%20of%20custom%20models%2C%20classifiers%2C%20and%20rankers%20to%20fit%20your%20domain-specific%20needs%3C%2Fli%3E%3C%2Ful%3E%3C%2Fp%3E%22%2C%22isPrivate%22%3Afalse%2C%22hasPrivateOffer%22%3Afalse%2C%22isMacc%22%3Atrue%2C%22isPreview%22%3Afalse%2C%22isByol%22%3Afalse%2C%22isCSPEnabled%22%3Atrue%2C%22isCSPSelective%22%3Afalse%2C%22isThirdParty%22%3Afalse%2C%22isStopSell%22%3Afalse%2C%22isReseller%22%3Afalse%2C%22hasFreeTrials%22%3Afalse%2C%22marketingMaterial%22%3A%5B%5D%2C%22version%22%3A%221.0.16%22%2C%22metadata%22%3A%7B%22leadGeneration%22%3Anull%2C%22testDrive%22%3Anull%7D%2C%22categoryIds%22%3A%5B%22azure%22%2C%22data%22%2C%22dataInsight%22%2C%22dataService%22%2C%22mobileAddOn%22%2C%22webAddOn%22%5D%2C%22screenshotUris%22%3A%5B%5D%2C%22links%22%3A%5B%7B%22id%22%3A%220%22%2C%22displayName%22%3A%22Documentation%22%2C%22uri%22%3A%22https%3A%2F%2Fdocs.microsoft.com%2Fazure%2Fsearch%2F%22%7D%2C%7B%22id%22%3A%221%22%2C%22displayName%22%3A%22Service%20Overview%22%2C%22uri%22%3A%22https%3A%2F%2Fazure.microsoft.com%2Fservices%2Fsearch%2F%20%22%7D%2C%7B%22id%22%3A%222%22%2C%22displayName%22%3A%22Pricing%20Details%22%2C%22uri%22%3A%22https%3A%2F%2Fazure.microsoft.com%2Fpricing%2Fdetails%2Fsearch%2F%22%7D%2C%7B%22id%22%3A%223%22%2C%22displayName%22%3A%22Stack%20Overflow%22%2C%22uri%22%3A%22https%3A%2F%2Fstackoverflow.com%2Fquestions%2Ftagged%2Fazure-search%22%7D%5D%2C%22filters%22%3A%5B%5D%2C%22plans%22%3A%5B%7B%22id%22%3A%22Search%22%2C%22displayName%22%3A%22Azure%20Cognitive%20Search%22%2C%22summary%22%3A%22AI-powered%20cloud%20search%20service%20for%20mobile%20and%20web%20app%20development%20(formerly%20Azure%20Search)%22%2C%22description%22%3A%22%3Cp%3EAI-powered%20cloud%20search%20service%20for%20mobile%20and%20web%20app%20development%3C%2Fp%3E%3Cp%3EAzure%20Cognitive%20Search%20(formerly%20Azure%20Search)%20is%20the%20only%20cloud%20search%20service%20with%20built-in%20artificial%20intelligence%20(AI)%20capabilities%20that%20enrich%20all%20types%20of%20information%20to%20easily%20identify%20and%20explore%20relevant%20content%20at%20scale.%20It%20uses%20the%20same%20integrated%20Microsoft%20natural%20language%20stack%20that%20Bing%20and%20Office%20have%20used%20for%20more%20than%20a%20decade%2C%20and%20prebuilt%20AI%20APIs%20across%20vision%2C%20language%2C%20and%20speech.%3C%2Fp%3E%3Cp%3EAzure%20Cognitive%20Search%20Features%3A%20%3Cul%3E%3Cli%3EFully%20managed%20search%20as%20a%20service%20to%20reduce%20complexity%20and%20scale%20easily%3C%2Fli%3E%3Cli%3EAuto-complete%2C%20geospatial%20search%2C%20filtering%2C%20and%20faceting%20capabilities%20for%20a%20rich%20user%20experience%3C%2Fli%3E%3Cli%3EBuilt-in%20AI%20capabilities%20including%20OCR%2C%20key%20phrase%20extraction%2C%20and%20named%20entity%20recognition%20to%20unlock%20insights%3C%2Fli%3E%3Cli%3EFlexible%20integration%20of%20custom%20models%2C%20classifiers%2C%20and%20rankers%20to%20fit%20your%20domain-specific%20needs%3C%2Fli%3E%3C%2Ful%3E%3C%2Fp%3E%22%2C%22restrictedAudience%22%3A%7B%7D%2C%22skuId%22%3A%22Search%22%2C%22planId%22%3A%22Search%22%2C%22legacyPlanId%22%3A%22Microsoft.Search%22%2C%22keywords%22%3A%5B%5D%2C%22type%22%3A%22None%22%2C%22leadGeneration%22%3Anull%2C%22testDrive%22%3Anull%2C%22categoryIds%22%3A%5B%22azure%22%2C%22data%22%2C%22dataInsight%22%2C%22dataService%22%2C%22mobileAddOn%22%2C%22webAddOn%22%5D%2C%22conversionPaths%22%3A%5B%5D%2C%22metadata%22%3A%7B%7D%2C%22uiDefinitionUri%22%3A%22https%3A%2F%2Fcatalogartifact.azureedge.net%2Fpublicartifacts%2FMicrosoft.Search-1.0.16%2FUIDefinition.json%22%2C%22artifacts%22%3A%5B%7B%22name%22%3A%22searchServiceDefaultTemplate%22%2C%22uri%22%3A%22https%3A%2F%2Fcatalogartifact.azureedge.net%2Fpublicartifacts%2FMicrosoft.Search-1.0.16%2FsearchServiceDefaultTemplate.json%22%2C%22type%22%3A%22Template%22%7D%5D%2C%22version%22%3A%221.0.16%22%2C%22itemName%22%3A%22Search%22%2C%22isPrivate%22%3Afalse%2C%22isHidden%22%3Afalse%2C%22hasFreeTrials%22%3Afalse%2C%22isByol%22%3Afalse%2C%22isFree%22%3Afalse%2C%22isPayg%22%3Afalse%2C%22isStopSell%22%3Afalse%2C%22cspState%22%3A%22OptIn%22%2C%22isQuantifiable%22%3Afalse%2C%22vmSecuritytype%22%3A%22None%22%2C%22purchaseDurationDiscounts%22%3A%5B%5D%2C%22upns%22%3A%5B%5D%2C%22hasRI%22%3Afalse%2C%22stackType%22%3A%22ARM%22%7D%5D%2C%22selectedPlanId%22%3A%22Search%22%2C%22iconFileUris%22%3A%7B%22small%22%3A%22https%3A%2F%2Fcatalogartifact.azureedge.net%2Fpublicartifacts%2FMicrosoft.Search-1.0.16%2FSmall.png%22%2C%22medium%22%3A%22https%3A%2F%2Fcatalogartifact.azureedge.net%2Fpublicartifacts%2FMicrosoft.Search-1.0.16%2FMedium.png%22%2C%22large%22%3A%22https%3A%2F%2Fcatalogartifact.azureedge.net%2Fpublicartifacts%2FMicrosoft.Search-1.0.16%2FLarge.png%22%2C%22wide%22%3A%22https%3A%2F%2Fcatalogartifact.azureedge.net%2Fpublicartifacts%2FMicrosoft.Search-1.0.16%2FWide.png%22%7D%2C%22itemType%22%3A%22Single%22%2C%22hasNoProducts%22%3Atrue%2C%22hasNoPlans%22%3Afalse%2C%22privateBadgeText%22%3Anull%2C%22createBladeType%22%3A1%2C%22offerType%22%3A%22None%22%2C%22useEnterpriseContract%22%3Afalse%2C%22hasStandardContractAmendments%22%3Afalse%2C%22standardContractAmendmentsRevisionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22supportUri%22%3Anull%2C%22galleryItemAccess%22%3A0%2C%22privateSubscriptions%22%3A%5B%5D%2C%22isTenantPrivate%22%3Afalse%2C%22hasRIPlans%22%3Afalse%7D/id/Search/resourceGroupId//resourceGroupLocation//dontDiscardJourney~/false) in a region and tier that supports Semantic Search. You'll also need:
  - Index Name
  - Semantic Configuration Name
  - API Key
## Running the app locally
This project can be run anywhere, but VS Code is required for local debugging.
1.	Open the application with VS Code.
2.	Install dependencies 
   ```bash
   npm install
   ```
3.	Run the React Application
   ```bash
   npm start
   ```

## Contribute
If you'd like to contribute, please submit a PR and a member of the Semantic Search Team will approve/reject the PR. For further info, please reach out to the Semantic Search PM, [Farzad Sunavala](fsunavala@microsoft.com)
