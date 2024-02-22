import {
  Container,
  ContainerAppointmentClient,
  ContainerAppointmentClientImage,
  ContainerAppointmentClientInfos,
  ContainerAppointmentClientInfoNameLastName,
  ContainerAppointmentClientInfoPhone,
  ContainerAppointmentAddress,
  ContainerAppointmentAddressInfos,
  AppointmentClientImage,
  AppointmentClientInfoNameLastName,
  AppointmentClientInfoPhone,
  AppointmentAddressInfoAddressNumber,
  AppointmentAddressInfoZipcode,
  ContainerAppointmentTitle,
  AppointmentTitle,
  ContainerAppointmentAddressNumberInfo,
  ContainerAppointmentAddressInfoZipcode,
  ContainerAppointmentAddressInfoDistrictCity,
  AppointmentAddressInfoDistrictCity,
  ContainerAppointmentAddressInfoComplementReference,
  AppointmentAddressInfoComplementReference,
  ContainerAppointmentServices,
  ContainerAppointmentService,
  ContainerAppointmentServiceNameInfo,
  AppointmentServiceNameInfo,
  ContainerAppointmentServiceInfoAmount,
  AppointmentServiceInfoAmount,
  ContainerAppointmentServicesTotal,
  AppointmentServicesTotal,
  ContainerAppointmentDate,
  ContainerAppointmentInitialDateInfo,
  AppointmentInitialDateInfoDate,
  ContainerAppointmentFinalDateInfo,
  AppointmentFinalDateInfoDate,
  ContainerAppointmentStatusActions,
  ContainerAppointmentStatusActionsCancel,
  AppointmentStatusActionsCancel,
  ContainerAppointmentStatusActionsConfirm,
  AppointmentStatusActionsConfirm
} from "./styles";

export default function ProviderAppointments() {

  return (
    <Container>
      <ContainerAppointmentTitle>
        <AppointmentTitle>Agendamento</AppointmentTitle>
      </ContainerAppointmentTitle>

      <ContainerAppointmentClient>
        <ContainerAppointmentClientImage>
          <AppointmentClientImage
            source={{
              uri: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
            }}
          />
        </ContainerAppointmentClientImage>
        <ContainerAppointmentClientInfos>
          <ContainerAppointmentClientInfoNameLastName>
            <AppointmentClientInfoNameLastName>Anderson Fernandes</AppointmentClientInfoNameLastName>
          </ContainerAppointmentClientInfoNameLastName>
          <ContainerAppointmentClientInfoPhone>
            <AppointmentClientInfoPhone>16993056772</AppointmentClientInfoPhone>
          </ContainerAppointmentClientInfoPhone>
        </ContainerAppointmentClientInfos>
      </ContainerAppointmentClient>
      <ContainerAppointmentAddress>
        <ContainerAppointmentAddressInfos>
          <ContainerAppointmentAddressNumberInfo>
            <AppointmentAddressInfoAddressNumber>Anderson Fernandes</AppointmentAddressInfoAddressNumber>
          </ContainerAppointmentAddressNumberInfo>
          <ContainerAppointmentAddressInfoZipcode>
            <AppointmentAddressInfoZipcode>16993056772</AppointmentAddressInfoZipcode>
          </ContainerAppointmentAddressInfoZipcode>
          <ContainerAppointmentAddressInfoZipcode>
            <AppointmentAddressInfoZipcode>16993056772</AppointmentAddressInfoZipcode>
          </ContainerAppointmentAddressInfoZipcode>
          <ContainerAppointmentAddressInfoDistrictCity>
            <AppointmentAddressInfoDistrictCity>16993056772</AppointmentAddressInfoDistrictCity>
          </ContainerAppointmentAddressInfoDistrictCity>
          <ContainerAppointmentAddressInfoComplementReference>
            <AppointmentAddressInfoComplementReference>16993056772</AppointmentAddressInfoComplementReference>
          </ContainerAppointmentAddressInfoComplementReference>
        </ContainerAppointmentAddressInfos>
      </ContainerAppointmentAddress>
      <ContainerAppointmentServices>
        {[].map(() => <ContainerAppointmentService>
          <ContainerAppointmentServiceNameInfo>
            <AppointmentServiceNameInfo>Anderson Fernandes</AppointmentServiceNameInfo>
          </ContainerAppointmentServiceNameInfo>
          <ContainerAppointmentServiceInfoAmount>
            <AppointmentServiceInfoAmount>16993056772</AppointmentServiceInfoAmount>
          </ContainerAppointmentServiceInfoAmount>
        </ContainerAppointmentService>)}
        <ContainerAppointmentServicesTotal>
          <AppointmentServicesTotal>Total</AppointmentServicesTotal>
        </ContainerAppointmentServicesTotal>
      </ContainerAppointmentServices>
      <ContainerAppointmentDate>
        <ContainerAppointmentInitialDateInfo>
          <AppointmentInitialDateInfoDate>inicial 10/10/2022 - 10:34</AppointmentInitialDateInfoDate>
        </ContainerAppointmentInitialDateInfo>
        <ContainerAppointmentFinalDateInfo>
          <AppointmentFinalDateInfoDate>inicial 10/10/2022 - 10:34</AppointmentFinalDateInfoDate>
        </ContainerAppointmentFinalDateInfo>
      </ContainerAppointmentDate>
      <ContainerAppointmentStatusActions>
        <ContainerAppointmentStatusActionsCancel>
          <AppointmentStatusActionsCancel>Cancelar</AppointmentStatusActionsCancel>
        </ContainerAppointmentStatusActionsCancel>
        <ContainerAppointmentStatusActionsConfirm>
          <AppointmentStatusActionsConfirm>Confirmar</AppointmentStatusActionsConfirm>
        </ContainerAppointmentStatusActionsConfirm>
      </ContainerAppointmentStatusActions>
    </Container>
  );
}
