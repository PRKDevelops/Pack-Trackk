package com.packtrack.packtrack_backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {
        org.springframework.security.provisioning.InMemoryUserDetailsManager manager = new org.springframework.security.provisioning.InMemoryUserDetailsManager();
        manager.createUser(User.withUsername("admin").password("{noop}admin").roles("ADMIN").build());
        manager.createUser(User.withUsername("user").password("{noop}user").roles("USER").build());
        return manager;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()  // Disable CSRF if it's not needed
                .authorizeRequests()
                .antMatchers("/login", "/login/**", "/assets/**").permitAll()  // Allow access to login page and assets
                .anyRequest().authenticated()  // Authenticate all other pages
                .and()
                .formLogin()
                .loginPage("/login")  // Specify custom login page URL
                .loginProcessingUrl("/login")  // URL for form submission (POST)
                .defaultSuccessUrl("/dashboard", true)  // Redirect on successful login
                .failureUrl("/login?error=true")  // Redirect on failure
                .permitAll();
        return http.build();
    }
}
