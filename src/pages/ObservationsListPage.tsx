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
 * A page component that displays a searchable list of clinical observations.
 * Shows observations accessible to the current user in the current project context.
 * Provides search functionality by code, subject, and value, with navigation to observation details.
 *
 * @returns The observations listing page
 */
export function ObservationPage(): JSX.Element {
  const profile = useIEHRProfile() as Practitioner;
  const iehr = useIEHR();
  const project = iehr.getProject();
  const navigate = useIEHRNavigate();

  return (
    <Document>
      <Title>Observations</Title>
      <Text mb="sm">
        Here are the Observations accessible to <ResourceName value={profile} link /> in{' '}
        <ResourceName value={project} link />
      </Text>
      <SearchControl
        search={{
          resourceType: 'Observation',
          fields: ['code', 'subject'],
        }}
        onClick={(e) => navigate(`/${getReferenceString(e.resource)}`)}
        hideToolbar
      />
      <Outlet />
    </Document>
  );
}
