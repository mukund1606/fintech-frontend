/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */

/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import type { Form } from "../models/Form";
import type { initial_stats } from "../models/initial_stats";
import type { llm } from "../models/llm";
import type { orcReturnRype } from "../models/orcReturnRype";
import type { predictReturn } from "../models/predictReturn";
export class DefaultService {
  /**
   * Home
   * @returns any Successful Response
   * @throws ApiError
   */
  public static homeGet(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "http://10.10.160.97:8000/",
    });
  }
  /**
   * Recomend
   * @param requestBody
   * @returns predictReturn Successful Response
   * @throws ApiError
   */
  public static recomendRecomendedPost(
    requestBody: initial_stats,
  ): CancelablePromise<predictReturn> {
    return __request(OpenAPI, {
      method: "POST",
      url: "http://10.10.160.97:8000/recomended",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Ocr
   * @param requestBody
   * @returns orcReturnRype Successful Response
   * @throws ApiError
   */
  public static ocrOcrPost(
    requestBody: Form,
  ): CancelablePromise<orcReturnRype> {
    return __request(OpenAPI, {
      method: "POST",
      url: "http://10.10.160.97:8000/ocr",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
  /**
   * Get Llm
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getLlmChatPost(requestBody: llm): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "http://10.10.160.97:8000/chat",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
