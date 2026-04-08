import {
  ExecArgs,
  IRegionModuleService,
  ISalesChannelModuleService,
} from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function seedData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  logger.info("Seeding store data...")

  const regionModule: IRegionModuleService = container.resolve(
    Modules.REGION
  )

  const salesChannelModule: ISalesChannelModuleService = container.resolve(
    Modules.SALES_CHANNEL
  )

  // Create default region
  const regions = await regionModule.listRegions({})
  if (regions.length === 0) {
    logger.info("Creating default region...")
    await regionModule.createRegions({
      name: "Europe",
      currency_code: "eur",
      countries: ["es", "fr", "de", "it", "pt"],
    })
  }

  // Create default sales channel
  const channels = await salesChannelModule.listSalesChannels({})
  if (channels.length === 0) {
    logger.info("Creating default sales channel...")
    await salesChannelModule.createSalesChannels({
      name: "Default Sales Channel",
      description: "Default sales channel for LMRK Store",
      is_disabled: false,
    })
  }

  logger.info("Seeding complete!")
}
