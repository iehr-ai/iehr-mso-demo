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
 * Patient page component for the MSO demo.
 * Displays a list of patients accessible to the current user in the current project context.
 * Provides search functionality by name, with navigation to patient details.
 *
 * @returns The patients listing page
 */
export function PatientPage(): JSX.Element {
  const profile = useIEHRProfile() as Practitioner;
  const iehr = useIEHR();
  const project = iehr.getProject();
  const navigate = useIEHRNavigate();

  return (
    <Document>
      <Title>Patients</Title>
      <Text mb="sm">
        Here are the Patients accessible to <ResourceName value={profile} link /> in{' '}
        <ResourceName value={project} link />
      </Text>
      <SearchControl
        search={{ resourceType: 'Patient', fields: ['name'] }}
        onClick={(e) => navigate(`/${getReferenceString(e.resource)}`)}
        hideToolbar
      />
      <Outlet />
    </Document>
  );
}
