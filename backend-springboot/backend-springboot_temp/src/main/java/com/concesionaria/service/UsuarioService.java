package com.concesionaria.service;

import com.concesionaria.model.Usuario;
import com.concesionaria.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(String username, String password) {
        Optional<Usuario> userOpt = usuarioRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();
            // INSECURE: In a real app, use BCrypt or similar. Using plain text for quick
            // setup as requested.
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }

    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public long count() {
        return usuarioRepository.count();
    }
}
