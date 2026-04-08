"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedData;
const utils_1 = require("@medusajs/framework/utils");
async function seedData({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    logger.info("Seeding store data...");
    const regionModule = container.resolve(utils_1.Modules.REGION);
    const salesChannelModule = container.resolve(utils_1.Modules.SALES_CHANNEL);
    // Create default region
    const regions = await regionModule.listRegions({});
    if (regions.length === 0) {
        logger.info("Creating default region...");
        await regionModule.createRegions({
            name: "Europe",
            currency_code: "eur",
            countries: ["es", "fr", "de", "it", "pt"],
        });
    }
    // Create default sales channel
    const channels = await salesChannelModule.listSalesChannels({});
    if (channels.length === 0) {
        logger.info("Creating default sales channel...");
        await salesChannelModule.createSalesChannels({
            name: "Default Sales Channel",
            description: "Default sales channel for LMRK Store",
            is_disabled: false,
        });
    }
    logger.info("Seeding complete!");
}
//# sourceMappingURL=seed.js.map