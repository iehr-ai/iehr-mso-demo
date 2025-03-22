import { Title, Text } from '@mantine/core';
import { getReferenceString } from '@iehr/core';
import { Practitioner } from '@iehr/fhirtypes';
import {
  Document,
  ResourceName,
  SearchControl,
  useIEHR,
  useIEHRNavigate,
  useIEHRProfile,
} from '@iehr/react';
import { Outlet } from 'react-router';

/**
 * A page component that displays a searchable list of diagnostic reports.
 * Shows reports accessible to the current user in the current project context.
 * Provides search functionality by code, subject, and results, with navigation to report details.
 *
 * @returns The diagnostic reports listing page
 */
export function DiagnosticReportPage(): JSX.Element {
  const profile = useIEHRProfile() as Practitioner;
  const iehr = useIEHR();
  const project = iehr.getProject();
  const navigate = useIEHRNavigate();

  return (
    <Document>
      <Title>Diagnostic Reports</Title>
      <Text mb="sm">
        Here are the Diagnostic Reports accessible to <ResourceName value={profile} link /> in{' '}
        <ResourceName value={project} link />
      </Text>
      <SearchControl
        search={{
          resourceType: 'DiagnosticReport',
          fields: ['code', 'subject'],
        }}
        onClick={(e) => navigate(`/${getReferenceString(e.resource)}`)}
        hideToolbar
      />
      <Outlet />
    </Document>
  );
}
