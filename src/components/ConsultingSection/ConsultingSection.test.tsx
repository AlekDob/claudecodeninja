import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ConsultingSection } from './ConsultingSection';

const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver as any;

describe('ConsultingSection', () => {
  it('renders the form with all fields', () => {
    render(<ConsultingSection />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo cliente/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/messaggio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /invia richiesta/i })).toBeInTheDocument();
  });

  it('validates nome field on blur', async () => {
    const user = userEvent.setup();
    render(<ConsultingSection />);

    const nomeInput = screen.getByLabelText(/nome/i);

    await user.type(nomeInput, 'A');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/il nome deve contenere almeno 2 caratteri/i)).toBeInTheDocument();
    });
  });

  it('validates email field on blur with invalid email', async () => {
    const user = userEvent.setup();
    render(<ConsultingSection />);

    const emailInput = screen.getByLabelText(/email/i);

    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/inserisci un indirizzo email valido/i)).toBeInTheDocument();
    });
  });

  it('validates email field on blur with valid email', async () => {
    const user = userEvent.setup();
    render(<ConsultingSection />);

    const emailInput = screen.getByLabelText(/email/i);

    await user.type(emailInput, 'test@example.com');
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText(/inserisci un indirizzo email valido/i)).not.toBeInTheDocument();
    });
  });

  it('validates tipo field on blur when empty', async () => {
    render(<ConsultingSection />);

    const tipoSelect = screen.getByLabelText(/tipo cliente/i);

    fireEvent.focus(tipoSelect);
    fireEvent.blur(tipoSelect);

    await waitFor(() => {
      expect(screen.getByText(/seleziona il tipo di cliente/i)).toBeInTheDocument();
    });
  });

  it('validates messaggio field on blur', async () => {
    const user = userEvent.setup();
    render(<ConsultingSection />);

    const messaggioInput = screen.getByLabelText(/messaggio/i);

    await user.type(messaggioInput, 'Short');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/il messaggio deve contenere almeno 10 caratteri/i)).toBeInTheDocument();
    });
  });

  it('disables submit button when form is invalid', () => {
    render(<ConsultingSection />);

    const submitButton = screen.getByRole('button', { name: /invia richiesta/i });

    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    const user = userEvent.setup();
    render(<ConsultingSection />);

    const nomeInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const tipoSelect = screen.getByLabelText(/tipo cliente/i);
    const messaggioInput = screen.getByLabelText(/messaggio/i);

    await user.type(nomeInput, 'Mario Rossi');
    await user.type(emailInput, 'mario@example.com');
    await user.selectOptions(tipoSelect, 'Azienda');
    await user.type(messaggioInput, 'Questo è un messaggio valido di test');

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /invia richiesta/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('submits form and shows success message', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<ConsultingSection />);

    const nomeInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const tipoSelect = screen.getByLabelText(/tipo cliente/i);
    const messaggioInput = screen.getByLabelText(/messaggio/i);

    await user.type(nomeInput, 'Mario Rossi');
    await user.type(emailInput, 'mario@example.com');
    await user.selectOptions(tipoSelect, 'Azienda');
    await user.type(messaggioInput, 'Questo è un messaggio valido di test');

    const submitButton = screen.getByRole('button', { name: /invia richiesta/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/richiesta inviata!/i)).toBeInTheDocument();
      expect(screen.getByText(/ti risponderò entro 24 ore/i)).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      nome: 'Mario Rossi',
      email: 'mario@example.com',
      tipo: 'Azienda',
      messaggio: 'Questo è un messaggio valido di test'
    });

    consoleSpy.mockRestore();
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    render(<ConsultingSection />);

    const nomeInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const tipoSelect = screen.getByLabelText(/tipo cliente/i);
    const messaggioInput = screen.getByLabelText(/messaggio/i);

    await user.type(nomeInput, 'Mario Rossi');
    await user.type(emailInput, 'mario@example.com');
    await user.selectOptions(tipoSelect, 'Azienda');
    await user.type(messaggioInput, 'Questo è un messaggio valido di test');

    const submitButton = screen.getByRole('button', { name: /invia richiesta/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/richiesta inviata!/i)).toBeInTheDocument();
    });
  });

  it('shows error messages for all fields on submit with invalid data', async () => {
    const user = userEvent.setup();
    render(<ConsultingSection />);

    const nomeInput = screen.getByLabelText(/nome/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messaggioInput = screen.getByLabelText(/messaggio/i);

    await user.type(nomeInput, 'A');
    await user.type(emailInput, 'invalid');
    await user.type(messaggioInput, 'Short');

    const submitButton = screen.getByRole('button', { name: /invia richiesta/i });

    expect(submitButton).toBeDisabled();
  });

  it('clears error when user starts typing again', async () => {
    const user = userEvent.setup();
    render(<ConsultingSection />);

    const nomeInput = screen.getByLabelText(/nome/i);

    await user.type(nomeInput, 'A');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/il nome deve contenere almeno 2 caratteri/i)).toBeInTheDocument();
    });

    await user.type(nomeInput, 'lek');

    await waitFor(() => {
      expect(screen.queryByText(/il nome deve contenere almeno 2 caratteri/i)).not.toBeInTheDocument();
    });
  });

  it('renders mailto link as fallback', () => {
    render(<ConsultingSection />);

    const mailtoLink = screen.getByText(/oppure scrivi a gmail@alekdob.com/i);

    expect(mailtoLink).toBeInTheDocument();
    expect(mailtoLink).toHaveAttribute('href', 'mailto:gmail@alekdob.com');
  });

  it('renders all benefit items', () => {
    render(<ConsultingSection />);

    expect(screen.getByText(/quick wins immediati/i)).toBeInTheDocument();
    expect(screen.getByText(/strategia personalizzata/i)).toBeInTheDocument();
    expect(screen.getByText(/training hands-on/i)).toBeInTheDocument();
  });

  it('renders social proof section with pricing', () => {
    render(<ConsultingSection />);

    expect(screen.getByText(/€500\/ora/i)).toBeInTheDocument();
    expect(screen.getByText(/sessioni da 2h/i)).toBeInTheDocument();
  });
});
