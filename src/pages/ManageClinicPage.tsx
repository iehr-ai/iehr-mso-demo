import { Title, Tabs, Alert, Text } from '@mantine/core';
import { Organization } from '@iehr/fhirtypes';
import { Document, useIEHR } from '@iehr/react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { normalizeErrorString } from '@iehr/core';
import '@mantine/notifications/styles.css';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAdminStatus } from '../utils/admin';
import { ClinicianList } from '../components/ClinicianList';
import { PatientList } from '../components/PatientList';

/**
 * A page component for managing a specific clinic and its members.
 * Provides interfaces for enrolling and managing patients and practitioners
 * associated with the clinic.
 *
 * @returns The clinic management page
 */
export function ManageClinicPage(): JSX.Element {
  const iehr = useIEHR();
  const { id } = useParams();
  const [organization, setOrganization] = useState<Organization>();
  const [activeTab, setActiveTab] = useState<string | null>('practitioners');
  const { isAdmin, loading: adminLoading } = useAdminStatus();

  useEffect(() => {
    const loadOrganization = async (): Promise<void> => {
      const org = await iehr.readResource('Organization', id as string);
      setOrganization(org);
    };

    loadOrganization().catch((error) => {
      showNotification({
        title: 'Error',
        message: normalizeErrorString(error),
        color: 'red',
      });
    });
  }, [iehr, id]);

  // If still checking admin status, show loading
  if (adminLoading) {
    return (
      <Document>
        <Title>Manage Clinic</Title>
        <Text>Loading...</Text>
      </Document>
    );
  }

  // If user is not an admin, show access denied message
  if (!isAdmin) {
    return (
      <Document>
        <Title>Manage Clinic</Title>
        <Alert icon={<IconAlertCircle size={16} />} title="Access Denied" color="red">
          You need to be an Admin to view this page. Please contact your system administrator for access.
        </Alert>
      </Document>
    );
  }

  if (!organization) {
    return (
      <Document>
        <Title>Loading...</Title>
      </Document>
    );
  }

  return (
    <Document>
      {organization && (
        <>
          <Title>{organization.name}</Title>

          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List mb="md">
              <Tabs.Tab value="practitioners">Clinicians</Tabs.Tab>
              <Tabs.Tab value="patients">Patients</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="practitioners">
              <ClinicianList organization={organization} />
            </Tabs.Panel>

            <Tabs.Panel value="patients">
              <PatientList organization={organization} />
            </Tabs.Panel>
          </Tabs>
        </>
      )}
    </Document>
  );
}
