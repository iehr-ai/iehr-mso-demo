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
 * A page component that displays a searchable list of clinical encounters.
 * Shows encounters accessible to the current user in the current project context.
 * Provides search functionality by type, subject, and participants, with navigation to encounter details.
 *
 * @returns The encounters listing page
 */
export function EncounterPage(): JSX.Element {
  const profile = useIEHRProfile() as Practitioner;
  const iehr = useIEHR();
  const project = iehr.getProject();
  const navigate = useIEHRNavigate();

  return (
    <Document>
      <Title>Encounters</Title>
      <Text mb="sm">
        Here are the Encounters accessible to <ResourceName value={profile} link /> in{' '}
        <ResourceName value={project} link />
      </Text>
      <SearchControl
        search={{
          resourceType: 'Encounter',
          fields: ['reasonCode', 'subject', 'status'],
        }}
        onClick={(e) => navigate(`/${getReferenceString(e.resource)}`)}
        hideToolbar
      />
      <Outlet />
    </Document>
  );
}
