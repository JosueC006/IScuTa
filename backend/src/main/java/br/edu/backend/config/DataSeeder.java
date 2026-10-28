package br.edu.backend.config;

import br.edu.backend.entity.*;
import br.edu.backend.entity.enums.TipoAviso;
import br.edu.backend.repository.AvisoRepository;
import br.edu.backend.repository.CartilhaRepository;
import br.edu.backend.repository.VideoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CartilhaRepository cartilhas;
    private final VideoRepository videos;
    private final AvisoRepository avisos;

    public DataSeeder(CartilhaRepository c, VideoRepository v, AvisoRepository a) {
        this.cartilhas = c; this.videos = v; this.avisos = a;
    }

    @Override
    public void run(String... args) {
        if (cartilhas.count() == 0) {
            cartilhas.save(cartilha("O que é PrEP?", "o-que-e-prep", "Prevenção antes da exposição.",
                    "## O que é PrEP?\n\nTexto de exemplo. **Substituir pelo conteúdo revisado.**"));
            cartilhas.save(cartilha("O que é PEP?", "o-que-e-pep", "Prevenção após a exposição.",
                    "## O que é PEP?\n\nTexto de exemplo. **Substituir pelo conteúdo revisado.**"));
        }
        if (videos.count() == 0) {
            var v = new Video();
            v.setTitulo("PrEP em 1 minuto");
            v.setDescricao("Vídeo de exemplo");
            v.setUrlEmbed("https://www.youtube-nocookie.com/embed/ID_DO_VIDEO");
            videos.save(v);
        }
        if (avisos.count() == 0) {
            var a = new Aviso();
            a.setTitulo("Campanha de testagem (exemplo)");
            a.setDescricao("Aviso de exemplo.");
            a.setTipo(TipoAviso.MULTIRAO_TESTAGEM);
            a.setAtivo(true);

            var programacao = new ProgramacaoAviso();
            programacao.setData(LocalDate.of(2026, 11, 10));
            programacao.setHorarioInicio(LocalTime.of(8, 0));
            programacao.setHorarioFim(LocalTime.of(12, 0));
            programacao.setLocal("COMPAZ Paulo Freire");

            a.addProgramacao(programacao);

            avisos.save(a);
        }
    }

    private Cartilha cartilha(String titulo, String slug, String resumo, String conteudo) {

        var c = new Cartilha();

        c.setTitulo(titulo);
        c.setSlug(slug);
        c.setResumo(resumo);
        c.setConteudo(conteudo);

        return c;
    }
}
