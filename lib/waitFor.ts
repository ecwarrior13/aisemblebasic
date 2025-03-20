import { FeatureFlag } from "@/features/flags";
import { useSchematicFlag } from "@schematichq/schematic-react";

export function waitFor(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

//file to wait for a certain amount of time

