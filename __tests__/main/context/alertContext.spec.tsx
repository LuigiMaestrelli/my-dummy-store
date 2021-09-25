import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  AlertProvider,
  AlertContextConsumer,
  useAlertContext
} from '@/main/contexts/alertContext';

describe('AlertContext', () => {
  it('should render children components', () => {
    render(
      <AlertProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AlertProvider>
    );

    const spanText = screen.getByText('Some text here');
    expect(spanText).toBeVisible();
  });

  it('should render the AlertDialog as invisible by default', () => {
    render(
      <AlertProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AlertProvider>
    );

    const spanText = screen.queryByTestId('alert-dialog-alert-context');
    expect(spanText).not.toBeInTheDocument();
  });

  it('should open the dialog when using the context consumer', async () => {
    render(
      <AlertProvider>
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
      </AlertProvider>
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
      <AlertProvider>
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
      </AlertProvider>
    );

    const divTest = screen.getByTestId('div-test-id');
    fireEvent.click(divTest);

    const okButton = screen.getByText('Ok');
    fireEvent.click(okButton);

    const spanText = screen.queryByTestId('alert-dialog-alert-context');
    expect(spanText).toBeInTheDocument();
  });

  it('should return context consumer when calling useAlertContext', async () => {
    render(
      <AlertProvider>
        <div>
          <span>Some text here</span>
        </div>
      </AlertProvider>
    );

    const { result } = renderHook(() => useAlertContext());
    expect(result.current).toBeTruthy();
  });
});
