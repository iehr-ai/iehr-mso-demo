import { Title } from '@mantine/core';
import { getDisplayString, getReferenceString } from '@iehr/core';
import { Resource, ResourceType } from '@iehr/fhirtypes';
import { Document, ResourceTable, useIEHR } from '@iehr/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/**
 * This is an example of a generic "Resource Display" page.
 * It uses the iEHR `<ResourceTable>` component to display a resource.
 *
 * @returns The generic resource display page
 */
export function ResourcePage(): JSX.Element | null {
  const iehr = useIEHR();
  const { resourceType, id } = useParams();
  const [resource, setResource] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    if (resourceType && id) {
      iehr
        .readResource(resourceType as ResourceType, id)
        .then(setResource)
        .catch(console.error);
    }
  }, [iehr, resourceType, id]);

  if (!resource) {
    return null;
  }

  return (
    <Document key={getReferenceString(resource)}>
      <Title>{getDisplayString(resource)}</Title>
      <ResourceTable key={`${resourceType}/${id}`} value={resource} />
    </Document>
  );
}
