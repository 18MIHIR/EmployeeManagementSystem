package org.codingwallah.emproject.services;

import org.codingwallah.emproject.entity.Role;
import org.codingwallah.emproject.entity.User;
import org.codingwallah.emproject.model.AuthResponse;
import org.codingwallah.emproject.model.LoginRequest;
import org.codingwallah.emproject.model.RegisterRequest;
import org.codingwallah.emproject.repository.RoleRepository;
import org.codingwallah.emproject.repository.UserRepository;
import org.codingwallah.emproject.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtProvider jwtProvider;
    
    public AuthResponse login(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
        
        if (userOpt.isEmpty()) {
            AuthResponse response = new AuthResponse();
            response.setMessage("User not found");
            return response;
        }
        
        User user = userOpt.get();
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            AuthResponse response = new AuthResponse();
            response.setMessage("Invalid password");
            return response;
        }
        
        if (!user.isActive()) {
            AuthResponse response = new AuthResponse();
            response.setMessage("User account is inactive");
            return response;
        }
        
        String token = jwtProvider.generateToken(user.getUsername(), user.getRole().getName());
        
        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.getRole().getName());
    }
    
    public AuthResponse register(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            AuthResponse response = new AuthResponse();
            response.setMessage("Username already exists");
            return response;
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            AuthResponse response = new AuthResponse();
            response.setMessage("Email already exists");
            return response;
        }
        
        // Get or create role
        String roleName = registerRequest.getRole() != null ? registerRequest.getRole() : "USER";
        Optional<Role> roleOpt = roleRepository.findByName(roleName);
        Role role;
        
        if (roleOpt.isEmpty()) {
            role = new Role(roleName);
            role = roleRepository.save(role);
        } else {
            role = roleOpt.get();
        }
        
        // Create new user
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        newUser.setRole(role);
        newUser.setActive(true);
        
        userRepository.save(newUser);
        
        // Generate token
        String token = jwtProvider.generateToken(newUser.getUsername(), newUser.getRole().getName());
        
        return new AuthResponse(token, newUser.getUsername(), newUser.getEmail(), newUser.getRole().getName());
    }
}
