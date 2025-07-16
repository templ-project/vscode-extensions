import { Extension } from '../../shared/types';

// Swagger/OpenAPI Support
export const swaggerEditor: Extension = {
  id: "42crunch.vscode-openapi",
  name: "OpenAPI (Swagger) Editor",
  description: "OpenAPI editing, validation and preview in VS Code",
  publisher: "42Crunch",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=42crunch.vscode-openapi",
  why_required: "Complete OpenAPI/Swagger editing with validation and preview"
};

export const swaggerViewer: Extension = {
  id: "arjun.swagger-viewer",
  name: "Swagger Viewer",
  description: "Swagger Viewer lets you preview and validate Swagger 2.0 and OpenAPI files",
  publisher: "Arjun",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=arjun.swagger-viewer",
  why_recommended: "Additional Swagger preview capabilities"
};

export const redoclyOpenAPI: Extension = {
  id: "redocly.openapi-vs-code",
  name: "Redocly OpenAPI",
  description: "OpenAPI authoring with Redocly tools",
  publisher: "Redocly",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=redocly.openapi-vs-code",
  why_recommended: "Professional OpenAPI authoring with Redocly ecosystem"
};

// REST API Testing
export const restClient: Extension = {
  id: "humao.rest-client",
  name: "REST Client",
  description: "REST Client for Visual Studio Code",
  publisher: "Huachao Mao",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=humao.rest-client",
  why_required: "Most popular REST API testing tool - create .http files to test APIs"
};

export const thunderClient: Extension = {
  id: "rangav.vscode-thunder-client",
  name: "Thunder Client",
  description: "Lightweight Rest API Client for VS Code",
  publisher: "Ranga Vadhineni",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client",
  why_recommended: "Alternative GUI-based REST client similar to Postman"
};

// VSCodium alternatives
export const swaggerEditorVSCodium: Extension = {
  id: "42crunch.vscode-openapi",
  name: "OpenAPI (Swagger) Editor",
  description: "OpenAPI editing, validation and preview in VS Code",
  publisher: "42Crunch",
  license: "MIT",
  marketplace_url: "https://open-vsx.org/extension/42crunch/vscode-openapi",
  why_required: "Complete OpenAPI/Swagger editing with validation and preview (Open VSX compatible)"
};

export const restClientVSCodium: Extension = {
  id: "humao.rest-client",
  name: "REST Client",
  description: "REST Client for Visual Studio Code",
  publisher: "Huachao Mao",
  license: "MIT",
  marketplace_url: "https://open-vsx.org/extension/humao/rest-client",
  why_required: "Most popular REST API testing tool - create .http files to test APIs (Open VSX compatible)"
};
