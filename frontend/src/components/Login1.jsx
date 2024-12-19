// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from './api';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

// Your existing styled components remain the same
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f5f5, #ffffff);
`;

const LoginForm = styled.form`
  background: #ffffff; /* Clean white form */
  padding: 40px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #333333; /* Neutral dark gray */
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;

  i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #bbbbbb; /* Subtle gray for icons */
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  color: #333333;
  background: #f9f9f9;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff; /* Subtle blue focus */
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    outline: none;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #007bff; /* Muted blue */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: #0056b3; /* Slightly darker blue */
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  }
`;

const LinkContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    color: #007bff; /* Clean blue for links */
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
`;

const Message = styled.p`
  padding: 10px;
  border-radius: 6px;
  margin: 10px 0;
  font-size: 14px;

  ${(props) =>
    props.$isError &&
    `
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545; /* Error red */
  `}

  ${(props) =>
    props.$isSuccess &&
    `
    background: rgba(40, 167, 69, 0.1);
    color: #28a745; /* Success green */
  `}
`;



const Login1 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      console.log('Server response:', response.data);
      
      const role = response.data;
      setSuccess('Login successful! Redirecting...');
      const token = response.headers['authorization']; // Get token from headers
      
      // Store both token and role
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('isAuthenticated', 'true');
      
      switch(role) {
        case "ROLE_USER":
          navigate("/customer");
          break;
          case "ROLE_MANAGER":
          navigate("/manager");
          break;
        case "ROLE_ADMIN":
          navigate("/admin");
          break;
        
        default:
          navigate("/");
      }
      
    } catch (error) {
      setError('Login failed: ' + (error.response?.data || t("login.error_login_failed")));
    }
  };
  const styles = {
    languageSwitcher: {
      position: "absolute",
      top: "10px",
      right: "20px",
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#f8f9fa",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#e2e6ea",
    },
  };
  
  
  return (
  <div>
    <div style={styles.languageSwitcher}>
        <button
          onClick={() => changeLanguage("en")}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("fr")}
          style={styles.button}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Français
        </button>
      </div>
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>{t("login.welcome")}</Title>
        <br />
          <h2>{t("login.login")}</h2>
          <br />
        <InputGroup>
          <i className="fas fa-user"></i>
          <br />
          <label htmlFor="username">{t("login.email")}</label>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <i className="fas fa-lock"></i>
          <br />
            <label htmlFor="password">{t("login.password")}</label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <LoginButton type="submit">{t("login.login")}</LoginButton>

        {error && <Message $isError>{error}</Message>}
        {success && <Message $isSuccess>{success}</Message>}

        <LinkContainer>
        <span>
            {t("login.no_account")}
            <Link to="/register"> {t("login.register_here")}</Link>
          </span>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </LinkContainer>
      </LoginForm>
    </LoginContainer>
    </div>
  );
};

export default Login1;
