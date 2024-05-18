import * as tf from "@tensorflow/tfjs";
import { NSFW_CLASSES } from "./nsfw_classes";
declare global {
    namespace NodeJS {
        interface Global {
            [x: string]: any;
        }
    }
}
type IOHandler = tf.io.IOHandler;
export type frameResult = {
    index: number;
    totalFrames: number;
    predictions: Array<predictionType>;
    image: HTMLCanvasElement | ImageData;
};
export type classifyConfig = {
    topk?: number;
    fps?: number;
    onFrame?: (result: frameResult) => any;
};
interface nsfwjsOptions {
    size?: number;
    type?: string;
}
export type predictionType = {
    className: (typeof NSFW_CLASSES)[keyof typeof NSFW_CLASSES];
    probability: number;
};
export type ModelName = "MobileNetV2" | "MobileNetV2Mid" | "InceptionV3";
export declare function load(modelOrUrl?: ModelName): Promise<NSFWJS>;
export declare function load(modelOrUrl?: string, options?: nsfwjsOptions): Promise<NSFWJS>;
export declare class NSFWJS {
    endpoints: string[];
    model: tf.LayersModel | tf.GraphModel;
    private options;
    private urlOrIOHandler;
    private intermediateModels;
    private normalizationOffset;
    constructor(modelUrlOrIOHandler: string | IOHandler, options: nsfwjsOptions);
    load(): Promise<void>;
    infer(img: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, endpoint?: string): tf.Tensor;
    classify(img: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, topk?: number): Promise<Array<predictionType>>;
}
export {};
