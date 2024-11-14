import fs from "fs-extra";
import { db } from "../mongo.js";
import * as helper from "../helper.js";

const FEATURED_PROFILES = [
  {
    // pvty
    uuid: "f6014e2407444be9b3914c5c12ad8724",
    type: "MAINTAINER",
    message: "bello",
  },
  {
    // Technoblade
    uuid: "b876ec32e396476ba1158438d83c67d4",
    type: "TECHNOBLADE",
    message: "<i>Long live the Potato King!</i>",
  },
];

{
  await Promise.all(
    FEATURED_PROFILES.map(async (featuredProfile, index) => {
      const profile = await helper.resolveUsernameOrUuid(featuredProfile.uuid, db);

      FEATURED_PROFILES[index].username = profile.display_name;
      FEATURED_PROFILES[index].emoji = profile?.emoji;
    }),
  );

  const cachePath = helper.getCacheFolderPath(helper.getFolderPath());
  await fs.writeJson(helper.getCacheFilePath(cachePath, "json", "featured-profiles", "json"), FEATURED_PROFILES);

  // console.log("Featured profiles updated!");
}
