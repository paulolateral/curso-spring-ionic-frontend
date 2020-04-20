
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService, private alert: AlertController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(retry(1), catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error) {
                // client-side error
                errorMessage = error.error;
            }
            if (!error.status) {
                // server-side error
                errorMessage = JSON.parse(errorMessage);
            }
            console.log("Erro identificado pelo interceptor....");
            console.log(errorMessage);

            switch(error.status) {
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                default:
                this.handleError(errorMessage);
            }

            return Observable.throw(errorMessage);
        })) as any;
    }

    handle401() {
        alert(
            {
                header : 'Erro 401',
                message: 'Email ou senha incorreta',
                buttons : [
                    {
                        text: 'OK'
                    }
                ]            
            }
        );    
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handleError(errorMessage) {
        alert(
            {
                header : 'Erro ' + errorMessage.status,
                message: errorMessage.message,
                buttons : [
                    {
                        text: 'OK'
                    }
                ]            
            }
        );
    }
}

export const AuthInterceptorProvider = {
    provider : HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
