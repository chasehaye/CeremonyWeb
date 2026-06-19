import sendRequest from './sendRequest';

export function listTemplates(orgSlug: string) {
  return sendRequest(`/api/organization/${orgSlug}/templates`);
}

export function createTemplate(
  orgSlug: string,
  data: { name: string; subject: string; body: string; type: string }
) {
  return sendRequest(`/api/organization/${orgSlug}/templates`, 'POST', data);
}

export function getTemplate(orgSlug: string, templateId: number) {
  return sendRequest(`/api/organization/${orgSlug}/templates/${templateId}`);
}

export function deleteTemplate(orgSlug: string, templateId: number) {
  return sendRequest(
    `/api/organization/${orgSlug}/templates/${templateId}`,
    'DELETE'
  );
}
