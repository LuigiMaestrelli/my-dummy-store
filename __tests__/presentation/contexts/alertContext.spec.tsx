import { render, screen, fireEvent } from '@testing-library/react';

import {
  AlertContextConsumer,
  AlertContextProvider
} from '@/presentation/contexts/alertContext';

describe('AlertContextProvider', () => {
  it('should render children components', () => {
    render(
      <AlertContextProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AlertContextProvider>
    );

    const spanText = screen.getByText('Some text here');
    expect(spanText).toBeVisible();
  });

  it('should render the AlertDialog as invisible by default', () => {
    render(
      <AlertContextProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AlertContextProvider>
    );

    const spanText = screen.queryByTestId('alert-dialog-alert-context');
    expect(spanText).not.toBeInTheDocument();
  });

  it('should open the dialog when using the context consumer', async () => {
    render(
      <AlertContextProvider>
        <AlertContextConsumer>
          {({ showAlertDialog }) => {
            return (
              <div
                data-testid="div-test-id"
                onClick={() => showAlertDialog('Title', 'Message')}
              >
                <span>Some text here</span>
              </div>
            );
          }}
        </AlertContextConsumer>
      </AlertContextProvider>
    );

    const divTest = screen.getByTestId('div-test-id');
    fireEvent.click(divTest);

    const title = screen.getByText('Title');
    expect(title).toBeVisible();

    const message = screen.getByText('Message');
    expect(message).toBeVisible();
  });

  it('should close the dialog when using the context consumer', async () => {
    render(
      <AlertContextProvider>
        <AlertContextConsumer>
          {({ showAlertDialog }) => {
            return (
              <div
                data-testid="div-test-id"
                onClick={() => showAlertDialog('Title', 'Message')}
              >
                <span>Some text here</span>
              </div>
            );
          }}
        </AlertContextConsumer>
      </AlertContextProvider>
    );

    const divTest = screen.getByTestId('div-test-id');
    fireEvent.click(divTest);

    const okButton = screen.getByText('Ok');
    fireEvent.click(okButton);

    const spanText = screen.queryByTestId('alert-dialog-alert-context');
    expect(spanText).toBeInTheDocument();
  });
});
